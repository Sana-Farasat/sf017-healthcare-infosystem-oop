#! /usr/bin/env node
//Shebang

import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import clear from "clear";

//********************This format prints date and time together*********************/
// let currentDate1 = new Date();
//     currentDate1.setDate(currentDate1.getDate());
//     console.log(currentDate1);
    
//**************Function to show words on screen with the delay of 50ms*****************/
    async function writeWords (words:string) 
    {
        for(let char of words)
             {
             process.stdout.write(char);
             await new Promise((resolve) => 
                   {
                    setTimeout(resolve,50) 
                   }
            )
            }
        }

//**************Function to show words on screen with the delay of 20ms**************/
  async function writeWordsfast (words:string) 
  {
      for(let char of words)
          {
          process.stdout.write(char);
          await new Promise((resolve) => 
              {
                  setTimeout(resolve,20) 
              }
          )
          }
    }
 
//******************************Patient info class*****************************/
class patientsInfo{
    name: string;
    fatherName: string;
    gender: string;
    age: number;
    contactNumber: number;

    constructor(name:string, fatherName:string, gender:string , age:number, contactNumber:number){
       this.name=name,
       this.fatherName=fatherName,
       this.gender=gender,
       this.age=age,
       this.contactNumber=contactNumber
    }

    //*********Static function in the class to generated random appointment number*************/
    // static appointmentNum():string{
    //     let randomNum= Math.floor(Math.random()* 1000 + 1)
    //     let staticTag= 'APN#'
    //     let patientNum=staticTag+randomNum
    //     return patientNum
    // }
}

//*****************************Available Doctors List******************************/
let consultantsName :string[]=[
    'Dr. Abdul Rehman (General Physician)__MBBS',
    'Dr. Sakeena Anwer (Child Specialist)__FCPS',
    'Dr. Abdul Qadeeer Khan (Ostreologist)__RMPH',
    'Dr. Nayyer Sheikh (ENT Specialist)__MBBS'
]

//*****************************Set date*******************************/
let currentDate=new Date()
let year=currentDate.getFullYear()
let month=currentDate.getMonth()
let date=currentDate.getDate()
let day=currentDate.getDay()

let formattedDate=(`${date}-${month+1}-${year}`)
//console.log(formattedDate); //Log for testing

//**************************Month formatting with name****************************/
let monthName : string[]=['January','Febraury','March','April','May','June','July','August','September','October','November','December']

let formattedMonth=monthName[month] //Passing index number of month in month name for compatibility
//console.log(formattedMonth);   //Log for testing

//******************************Days Set********************************/
let daysName : string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let formattedDays=daysName[day] //Passing index number of days in days name for compatibility

//console.log(formattedDays); //Log for testing

//***************************Ordinal format for date*****************************/
let dateSet=date.toString()
let ordinalNum=""
if(date === 1 || date === 31){
    ordinalNum= 'st';
}
else if(date === 2 || date === 22){
    ordinalNum='nd'
}
else if(date === 3 || date === 23){
    ordinalNum='rd'
}
else{
    ordinalNum='th'
}

let ordinalDate=dateSet+ordinalNum
//console.log(ordinalDate); //Log for testing



//**********************Set 24 Hour format time in 12 Hour format***********************/
let currentTime=new Date()
let hours=currentTime.getHours()+6
let minutes=currentTime.getMinutes()
let seconds=currentTime.getSeconds()

let timeZone : string = "";

if((hours >= 0 && hours <= 12) && (minutes >=0 && minutes <= 59)){
    timeZone = "AM"
}
else if((hours > 12 && hours <= 24) && (minutes >=0 && minutes <= 59)){
   timeZone = "PM"
   hours -=12   //hours = hours - 12
}

let hr=(`${hours.toString().padStart(2,'0')}`);
let min=(`${minutes.toString().padStart(2,'0')}`);
let sec=(`${seconds.toString().padStart(2,'0')}`);
let formattedTime=(`${hr}:${min}:${sec}`)

//Or

//let formattedTime=(`${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`)
//console.log(formattedTime+timeZone);

let formattingclock=(`${formattedTime} ${timeZone}`) //formattedTime+timeZone(concatenation with '+' but there is space issue with '+' concatenation)

//**********************Function for generating random appointment num**********************/
 async function appointmentNum():Promise<string>{
    let randomNum= Math.floor(Math.random()* 1000 + 1)
    let staticTag= 'CBA#'
    let patientNum=staticTag+randomNum
    return patientNum
}

//************************Function to set appointment date*****************************/
async function appointment() {
    
    let appointmentDate=(`${formattedMonth} ${ordinalDate} ${year}`);
    
    console.log(chalk.magentaBright(`\n\t ${formattedDays}, ${appointmentDate}`));
    console.log(chalk.magentaBright(`\n\t Please visit at ${formattingclock}\n`));
    
}

//***************************Main function to run program******************************/

async function main(){

//**************************Using clear module to clear the screen**************************/
   clear()

   await writeWords (chalk.yellowBright('\n\n\t'+'='.repeat(50)));
   await writeWords(chalk.yellowBright('\n\t\tHEALTH CARE INFORMATION SYSTEM'));
   await writeWords(chalk.yellowBright('\n\t'+'='.repeat(50))+'\n');

   let ask=await inquirer.prompt([
    {
        name:'name',
        type:'input',
        message:chalk.greenBright('\nEnter your name:'),
        validate:function(input){
            if(isNaN(input)){
                return true
            }
            else{
                return false
            }
        }
    },
    {
        name:'fathername',
        type:'input',
        message:chalk.greenBright('\nEnter your father name:'),
        validate:function(input){
            if(isNaN(input)){
                return true
            }
            else{
                return false
            }
        }
    },
    {
        name:'gender',
        type:'input',
        message:chalk.greenBright('\nEnter your gender:'),
        validate:function(input){
            if(input === 'male' || input === 'female'){
                return true
            }
            else if(input === 'Male' || input === 'Female'){
                return true
            }
            else if (input === 'MALE' || input === 'FEMALE'){
                return true
            }
            else{
                return false
            }
        }
    },
    {
        name:'age',
        type:'number',
        message:chalk.greenBright('\nEnter your age:'),
        validate: function(number){
            if( /^\d{1,2}$/.test(number)){    //validate 1 or 2 digits age by using regular expression regex
                return true
            }
            else{
                return false
            }
        }
    },
    {
        name:'contact',
        type:'number',
        message:chalk.greenBright('\nEnter your 4 digits contact number:'),
        validate: function(number){
        if( /^\d{4}$/.test(number)){  //validate 4 digits contact number by using regular expression regex
            return true
        }
        //else if(number.length > 4){
            //return '\nPlease enter 4 digits number!'
        //} 
        //else if(isNan(number)){
         //   return '\nPlease enter a valid phone number!'
        //}
        else{
                return false
            }
        }
    },
    
])

//***********************Using class attributes/methods in a variable***********************/
   let patientDetails=new patientsInfo(ask.name,ask.fathername,ask.gender,ask.age,ask.contact)
    
   clear()

  appointmentNum()
  .then((result)=>{
    console.log(chalk.yellowBright("\n\n\t\tYour appointment number is", result));
  });
  
  clear()

  //**************************Showing Consultant List**********************************/
  await writeWords(chalk.yellowBright('\n\n\t\t\t======Consultants=====\n'))
  await writeWords(chalk.yellowBright('\n\t\t\t'+'='.repeat(22)+'\n'));
  console.log();  //empty console to break line
 
  await writeWordsfast(chalk.magentaBright('\n\t\t'+consultantsName[0]))
  console.log(); //empty console to break line
  await writeWordsfast(chalk.yellowBright('\n\t\t'+consultantsName[1]))
  console.log(); //empty console to break line
  await writeWordsfast(chalk.magentaBright('\n\t\t'+consultantsName[2]))
  console.log(); //empty console to break line
  await writeWords(chalk.yellowBright('\n\t\t'+consultantsName[3]))
  console.log(); //empty console to break line
  

  let askDocName=await inquirer.prompt({
    name:'doctor',
    type:'list',
    message:chalk.blueBright('\n\n\nFrom whom you want to appoint?\n'),
    choices:[ 'Dr. Abdul Rehman (General Physician)',
        'Dr. Sakeena Anwer (Child Specialist)',
        'Dr. Abdul Qadeeer Khan (Ostreologist)',
        'Dr. Nayyer Sheikh (ENT Specialist)' ]
})
  
  clear()
  await writeWords(chalk.yellowBright('\n\t Your appointment file has been created \n'))

  await writeWordsfast (chalk.greenBright (`\n\t\t ${patientDetails.name.split(" ").map((a:string)=>a.charAt(0).toUpperCase()+ a.slice(1).toLowerCase()).join()}\n`));

  await writeWordsfast (chalk.greenBright(`\n\t\t ${patientDetails.fatherName.split(" ").map((a:string)=>a.charAt(0).toUpperCase()+ a.slice(1).toLowerCase()).join(" ")}\n`));
  await writeWordsfast (chalk.greenBright(`\n\t\t ${patientDetails.gender}\n`))
  console.log(chalk.greenBright(`\n\t\t ${patientDetails.age}`))
  console.log(chalk.greenBright(`\n\t\t ${patientDetails.contactNumber}`))
  console.log(chalk.greenBright(`\n\t\t ${askDocName.doctor}`));

 appointment()
 
  await writeWords (chalk.yellowBright ('\n\t\t ======THANK YOU======\n'))
  await writeWords(chalk.yellowBright('\n\t\t'+'='.repeat(23))+'\n');

}

//************************Calling function****************************/

main()



