export const getTimeBasedIcon = () =>{

    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        return {
            icon: <img src="./sun-icon.svg" alt="" srcSet="" />
            
        };
    } else if (currentHour >= 12 && currentHour < 18) {
        return {
            icon: <img src="./afternoon-icon.svg" alt="" srcSet="" />
            
        };
    } else {
        return {
            
            icon: <img src="./moon-icon.svg" alt="" srcSet="" />
        };
    }
}

export const getGreeting = () => {
    const currentHour = new Date().getHours();

    if(currentHour >= 5 && currentHour < 12)
    {
        return 'Good Morning, '
    }
    else if(currentHour >= 12 && currentHour < 17)
    {
        return 'Good Afternoon, '
    }
    else if(currentHour >= 17 && currentHour < 20)
    {
        return 'Good Evening, '
    }
    else{
        return 'Good Night '
    }
}

export const generateColorPosition = (index, numColors, radius) => {
    const startAngle = -55
    const endAngle = 55
    const angleSpan = endAngle - startAngle

    const angle = (startAngle + (index / (numColors - 1)) * angleSpan) * (Math.PI / 180)

    const pos ={
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
    }

    return pos
}



