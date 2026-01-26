import prisma from '../configs/prisma.js';

// Get all workspaces for user
export const getUserWorkspaces = async (req, res) => {
    try {
        const { userId, sessionClaims, orgId, orgSlug } = await req.auth();
        const userEmail = sessionClaims?.email;

        // 1. Ensure user exists in database
        let user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user && userEmail) {
            user = await prisma.user.create({
                data: {
                    id: userId,
                    email: userEmail,
                    name: sessionClaims?.name || 'User',
                    image: sessionClaims?.image || '',
                },
            });
            console.log('Created user:', userId);
        }

        // 2. If user is in a Clerk org, create workspace membership if it doesn't exist
        if (orgId) {
            const workspace = await prisma.workspace.findUnique({
                where: { slug: orgSlug || orgId },
                include: { members: true },
            });

            if (workspace) {
                // Check if user is already a member
                const existingMember = workspace.members.find(
                    (m) => m.userId === userId,
                );

                // Auto-add member if not exists
                if (!existingMember) {
                    await prisma.workspaceMember.create({
                        data: {
                            userId: userId,
                            workspaceId: workspace.id,
                            role: 'MEMBER', // Default to MEMBER
                        },
                    });
                    console.log(
                        'Auto-added member to workspace:',
                        workspace.id,
                    );
                }
            }
        }

        // 3. Fetch all workspaces for user
        const workspaces = await prisma.workspace.findMany({
            where: {
                members: { some: { userId: userId } },
            },
            include: {
                members: { include: { user: true } },
                projects: {
                    include: {
                        tasks: {
                            include: {
                                assignee: true,
                                comments: { include: { user: true } },
                            },
                        },
                        members: { include: { user: true } },
                    },
                },
                owner: true,
            },
        });

        console.log('User workspaces:', workspaces.length, 'for user:', userId);
        res.json({ workspaces });
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Add member to workspace
export const addMember = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { email, role, workspaceId, message } = req.body;

        // Check if user exist
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!workspaceId || !role) {
            return res
                .status(400)
                .json({ message: 'Missing required parameters' });
        }

        if (!['ADMIN', 'MEMBER'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // fetch workspace
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
            include: { members: true },
        });

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        // Check creator has admin role
        if (
            !workspace.members.find(
                (member) => member.userId === userId && member.role === 'ADMIN',
            )
        ) {
            return res
                .status(401)
                .json({ message: 'You do not have admin privileges' });
        }

        //Check if user is already member
        const existingMember = workspace.members.find(
            (member) => member.userId === userId,
        );

        if (existingMember) {
            return res
                .status(400)
                .json({ message: 'User is already a member' });
        }

        const member = await prisma.workspaceMember.create({
            data: {
                userId: user.id,
                workspaceId,
                role,
                message,
            },
        });

        res.json({ member, message: 'Member added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};
