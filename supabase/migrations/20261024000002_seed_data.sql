-- ==============================================================================
-- ALUMNUX SEED DATA: MIGRATION 20261024000002
-- Description: Standard departments, skill taxonomies, and 3 senior alumni admins
-- ==============================================================================

-- 1. Standard Departments
INSERT INTO departments (id, code, name) VALUES
    ('00000000-0000-0000-0000-000000000001', 'CSE', 'Computer Science & Engineering'),
    ('00000000-0000-0000-0000-000000000002', 'IT', 'Information Technology'),
    ('00000000-0000-0000-0000-000000000003', 'ECE', 'Electronics & Communication Engineering'),
    ('00000000-0000-0000-0000-000000000004', 'EEE', 'Electrical & Electronics Engineering'),
    ('00000000-0000-0000-0000-000000000005', 'MECH', 'Mechanical Engineering'),
    ('00000000-0000-0000-0000-000000000006', 'CIVIL', 'Civil Engineering'),
    ('00000000-0000-0000-0000-000000000007', 'AIDS', 'Artificial Intelligence & Data Science')
ON CONFLICT (code) DO NOTHING;

-- 2. Standard Skills Taxonomies
INSERT INTO skills (name, category) VALUES
    ('React / Next.js', 'Frontend'),
    ('TypeScript', 'Programming'),
    ('Node.js', 'Backend'),
    ('Go', 'Programming'),
    ('Python', 'Programming'),
    ('PostgreSQL', 'Databases'),
    ('System Design', 'Architecture'),
    ('Cloud Infrastructure (AWS/GCP)', 'DevOps'),
    ('Kubernetes & Docker', 'DevOps'),
    ('Machine Learning / PyTorch', 'Data Science'),
    ('Embedded Systems & VLSI', 'Core Engineering'),
    ('Product Management', 'Product'),
    ('Technical Interview Prep', 'Mentorship')
ON CONFLICT (name) DO NOTHING;

-- 3. The Three Designated Senior Alumni Trustees (Seed Stubs)
-- Note: UUIDs correspond to production auth IDs upon initial Google login
INSERT INTO profiles (
    id, email, full_name, headline, bio, account_type, department_id, 
    graduation_year, current_company, current_role, experience_years, 
    location_city, is_verified, is_active
) VALUES
    (
        '11111111-1111-1111-1111-111111111111',
        'trustee1.infra@alumnux.org',
        'Arunachalam S.',
        'Staff Infrastructure Engineer @ Tier-1 Cloud | Trustee',
        'Co-founder & Infrastructure Custodian for Alumnux. Anna Univ Class of 2016.',
        'admin',
        '00000000-0000-0000-0000-000000000001',
        2016,
        'Global Cloud Systems',
        'Staff Infrastructure Engineer',
        10.0,
        'Bengaluru',
        true,
        true
    ),
    (
        '22222222-2222-2222-2222-222222222222',
        'trustee2.product@alumnux.org',
        'Deepika Sundaram',
        'VP of Engineering @ Fintech Unicorn | Trustee',
        'Co-founder & Product Architecture Lead. Anna Univ Class of 2015.',
        'admin',
        '00000000-0000-0000-0000-000000000002',
        2015,
        'Apex Payments',
        'VP of Engineering',
        11.5,
        'Chennai',
        true,
        true
    ),
    (
        '33333333-3333-3333-3333-333333333333',
        'trustee3.governance@alumnux.org',
        'Venkatesh Raman',
        'Principal Security Architect @ CyberDefense | Trustee',
        'Co-founder & Privacy/Verification Custodian. Anna Univ Class of 2014.',
        'admin',
        '00000000-0000-0000-0000-000000000003',
        2014,
        'CyberDefense Labs',
        'Principal Security Architect',
        12.0,
        'Hyderabad',
        true,
        true
    )
ON CONFLICT (id) DO NOTHING;

-- 4. Assign Admin Roles to the 3 Trustees
INSERT INTO user_roles (user_id, role) VALUES
    ('11111111-1111-1111-1111-111111111111', 'admin'),
    ('22222222-2222-2222-2222-222222222222', 'admin'),
    ('33333333-3333-3333-3333-333333333333', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
