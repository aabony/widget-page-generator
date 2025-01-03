import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.$connect();

    const roles = [
        { name: 'admin' },
        { name: 'user' },
    ];

    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }

    console.log('Roles created or verified.');

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminRole = await prisma.role.findUnique({
        where: { name: 'admin' },
    });

    if (!adminRole) {
        throw new Error('Admin role not found. Ensure roles are seeded correctly.');
    }

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            name: 'Administrator',
            email: adminEmail,
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });

    console.log(`Admin user created with email: ${adminEmail} and password: ${adminPassword}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
