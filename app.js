const inquirer = require ('inquirer');

//9.2.6 because we added the module.exports statement at the end of the page-template.js file 
//9.2.6 (with module.exports set to our generatePage() function), 
//9.2.6 we can now use the require statement to include generatePage() at the top of the app.js file.
const generatePage = require('./src/page-template.js');

// since we have the asynchronous js file generate-site.js, we dont need fs call, instead, we use the following:
const { writeFile, copyFile } = require('./utils/generate-site.js');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your Github username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('You need to enter a project name!');
          return false;
        }
      }      
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('You need to enter a project description!');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter the GitHub link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log('You need to enter a project GitHub link!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false
    }
  ])
  .then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
    } else {
      return portfolioData;
    }
  })
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

  // So let's reiterate the flow this function will now have:

  // We start by asking the user for their information with Inquirer prompts; this returns all of the data as an object in a Promise.
  
  // The promptProject() function captures the returning data from promptUser() and we recursively call promptProject() for as many projects 
  //as the user wants to add. Each project will be pushed into a projects array in the collection of portfolio information, and when we're done, 
  //the final set of data is returned to the next .then().
  
  // The finished portfolio data object is returned as portfolioData and sent into the generatePage() function, 
  //which will return the finished HTML template code into pageHTML.
  
  // We pass pageHTML into the newly created writeFile() function, which returns a Promise. 
  //This is why we use return here, so the Promise is returned into the next .then() method.
  
  // Upon a successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve() execution to log it, 
  //and then we return copyFile().
  
  // The Promise returned by copyFile() then lets us know if the CSS file was copied correctly, and if so, we're all done!