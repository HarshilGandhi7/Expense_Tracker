import React from "react";
export const DateFormat = (date, format = "dd/MM/yyyy") => {

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0'); 
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();

    
    return format.replace("dd", day).replace("MM", month).replace("yyyy", year);

};
