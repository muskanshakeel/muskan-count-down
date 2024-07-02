#! /usr/bin/env node
import inquirer from "inquirer";

async function gateTargetDate(): Promise<Date> {
    const response = await inquirer.prompt([{
        name: "targetDate",
        type: "dateTime",
        message: "CHOOSE YOUR TARGET DATE AND TIME 'give your input like this'(yyyy-mm-dd)",
        format: ["yyyy", "-", "mm", "-", "dd", "", "hh", ":", "MM"],
        initial: new Date(),
    }]);
    const targetDateString = response.targetDate.toString();
    return new Date(targetDateString);
}

async function startCountdown() {
    const targetDate: Date = await gateTargetDate();

    function calculateTimeRemaining(targetDate: Date): {days: number; hours: number; minutes: number; seconds: number} {
        const now: Date = new Date();
        const difference: number = targetDate.getTime() - now.getTime();
        const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours: number = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes: number = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds: number = Math.floor((difference % (1000 * 60)) / 1000);
        return {days, hours, minutes, seconds};
    }

    function updateCountdown() {
        const { days, hours, minutes, seconds } = calculateTimeRemaining(targetDate);
          console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`);
    }
    setInterval(updateCountdown, 1000);
    }

    startCountdown();