
export const getDate = (time) =>{
    const currentDate = new Date(time);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const current = `${year}-${month}-${day}`;
    return current;
}

export const getDay =(date)=>{
    const day = new Date(date);
    const dayNumber = day.getUTCDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayNames[dayNumber];
    return dayName;
}