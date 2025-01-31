const { rmdirSync, mkdirSync, writeFileSync, readFileSync } = require('fs');
const { execSync } = require('child_process');

describe("Populate command", () => {
  beforeEach(() => {
    try {
      rmdirSync('tmp', { recursive: true });
    } catch {
      //
    }
    try {
      mkdirSync('tmp');
    } catch {
      //
    }
    execSync('npm link');
    execSync('greenpress create test-populate', { cwd: './tmp' });
  });
  afterAll(() => {
    rmdirSync('tmp', { recursive: true });
  });
  it('should run populate script', () => {
    const pkg = JSON.parse(readFileSync('tmp/test-populate/package.json').toString());
    pkg.scripts['populate-db'] = 'node -e "console.log(process.env.EMAIL, process.env.PASSWORD)"';
    writeFileSync('tmp/test-populate/package.json', JSON.stringify(pkg));

    const result = execSync('greenpress populate -e admin@test.com -p pass', { cwd: './tmp/test-populate' }).toString();

    expect(result).toContain('admin@test.com');
    expect(result).toContain('pass');
  });
})
