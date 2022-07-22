const {Builder} = require('selenium-webdriver');
const driver = new Builder().forBrowser('chrome').build();
const URL = 'https://pollolandia.vercel.app';


async function mainTest() {
    let originalName = 'David Atias';
    let nameToChange = 'David Atias R';
    const test = await testLogin(originalName);
    const test2 = await testDashboard(nameToChange);
    const test3 = await testLogOutEmployeer();
    const test4 = await testLoginEmployee();
    const test5 = await testDowloadPay();
    test ? console.log('Login Test Passed') : console.log('Login Test Failed');
    test2 ? console.log('Profile Test Passed') : console.log('Profile Test Failed');
    test3 ? console.log('Logout Test Passed') : console.log('Logout Test Failed');
    test4 ? console.log('Login Employee Test Passed') : console.log('Login Employee Test Failed');
    test5 ? console.log('Download Pay Test Passed') : console.log('Download Pay Test Failed');
    await driver.quit();
}

async function testLogin(name) {
    try {
        await driver.get(`${URL}/LogIn`);
        await driver.findElement({id: 'email-login-input'}).sendKeys('david.atias@ucr.ac.cr');
        await driver.sleep(2000);
        await driver.findElement({id: 'password-login-input'}).sendKeys('contra123');
        await driver.sleep(2000);
        await driver.findElement({id: 'submit-button'}).click();
        await driver.sleep(2000);
        const text = await driver.findElement({id: 'welcome-dashboard'}).getText();
        if (text === `Te damos la bienvenida, ${name}`) {
            return true;
        } else {
            return false;
        }
    } catch {
        await driver.quit();
        return false;
    }
}

async function testDashboard(name) {
    try {
        await driver.get(`${URL}/profile`);
        await driver.sleep(2000);
        // put text on the input with id 'Username' with 'David Atias'
        await driver.findElement({id: 'Username'}).clear();
        await driver.findElement({id: 'Username'}).sendKeys(name);
        await driver.sleep(2000);
        await driver.findElement({id: 'submit-profile-button'}).click();
        await driver.sleep(2000);
        await driver.get(`${URL}/`);
        await driver.sleep(2000);
        const text = await driver.findElement({id: 'welcome-dashboard'}).getText();
        if (text === `Te damos la bienvenida, ${name}`) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

async function testLogOutEmployeer() {
    try {
        await driver.get(`${URL}`);
        await driver.sleep(2000);
        await driver.findElement({id: 'logout-button'}).click();
        await driver.sleep(2000);
        const text = await driver.findElement({id: 'text-inicio-sesion'}).getText();
        if (text === `Inicio de Sesión`) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

async function testLoginEmployee() {
    try {
        await driver.get(`${URL}/LogIn`);
        await driver.sleep(2000);
        await driver.findElement({id: 'email-login-input'}).sendKeys('andrey.elizondovargas@ucr.ac.cr');
        await driver.sleep(2000);
        await driver.findElement({id: 'password-login-input'}).sendKeys('contra123');
        await driver.sleep(2000);
        await driver.findElement({id: 'submit-button'}).click();
        await driver.sleep(2000);
        test = await driver.findElement({id: 'subtext-dashboard-index'}).getText();
        if (test === `Ya puedes consultar los detalles de tus pagos`) {
            return true;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

async function testDowloadPay() {
    try {
        await driver.get(`${URL}/MyPays`);
        await driver.sleep(5000);
        await driver.findElement({id: 'save-excel-button'}).click();
        await driver.sleep(2000);
        
        return true;
    } catch {
        return false;
    }

}



mainTest();

