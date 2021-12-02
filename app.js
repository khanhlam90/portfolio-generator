//9.3 newly added - after comment out all current codes
const inquirer = require ('inquirer');

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
    console.log(portfolioData);
  });



          //lesson 9.1 - to capture the input
          //const profileDataArgs = process.argv.slice(2);
          //console.log(profileDataArgs);

//9.2 - adding the file system const, require statement allows the app.js file to access the fs module's functions through the fs assignment.
//const fs = require('fs');

//9.2.6 because we added the module.exports statement at the end of the page-template.js file 
//9.2.6 (with module.exports set to our generatePage() function), 
//9.2.6 we can now use the require statement to include generatePage() at the top of the app.js file.
//const generatePage = require('./src/page-template.js');

          //lesson 9.2 - to receive input and display data dynamically and feed data into the generatePage() fxn, 
          //and holds the user command-line arguments.
          //const profileDataArgs = process.argv.slice(2); //removed in 9.3 lesson as now we use npm inquirer

          // to extract those arguments and store them into distinct variables. One way to do this is to use the array index
          //const name = profileDataArgs[0];
          //const github = profileDataArgs[1]; //then edit the console log to print the return of generatePage() - console.log(generatePage(name, github));
          //shorter version
          //const [name, github] = profileDataArgs;//removed in 9.3 lesson as now we use npm inquirer

//9.3 lesson using npm inquirer
//const pageHTML = generatePage(name, github);

              //lesson 9.1
              // const printProfileData = profileDataArr => {
              //     // This...
              //     for (let i = 0; i < profileDataArr.length; i += 1) {
              //       console.log(profileDataArr[i]);
              //     }
                
              //     console.log('================');
                
              //     // Is the same as this...
              //     // profileDataArr.forEach((profileItem) => {
              //     //   console.log(profileItem)
              //     // });
              //     // Is the same as this...
              //     profileDataArr.forEach(profileItem => console.log(profileItem));
              //   };

              //   printProfileData(profileDataArgs);

              //lesson 9.2
              //hard coded way
              // const generatePage = () => 'Name: KHANH, Github: khanhlam90';
              // console.log(generatePage());

              //Template literals - make it dynamic - embed js expressions into the string, enclosed by backtick (`)
              // const generatePage = (userName, githubName) => `Name: ${userName}, Github: ${githubName}`;
              // console.log(generatePage('khanhlam', 'khanhlam90'));

              //or instead, use Multi-line strings - added carriage returns manually within the template literal - lines breaks in the code
              // const generatePage = (userName, githubName) => {
              //   return `
              //     Name: ${userName}
              //     GitHub: ${githubName}
              //   `;
              // };
              //console.log(generatePage('khanhlam', 'khanhlam90')); //replace with dynamic fxn
              //console.log(generatePage(name, github));

              //9.2 file system - first arg = file name, 2nd srg = data that will write onto the file (template literal), 3rd arg=callback fxn used for error handling
              //removed generatePage() with page HTML in 9.3 lesson as now we use npm inquirer
              // fs.writeFile('./index.html', generatePage(name, github), err => {
              //   if (err) throw new Error(err);

              //   console.log('Portfolio complete! Check out index.html to see the output!');
              // });

//lesson 9.3 - npm inquirer
// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });