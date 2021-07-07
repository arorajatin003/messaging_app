
import React, {useState} from 'react';


let Theme={mode: 'dark'};
function ButtonAppBar() {

  const [theme, setTheme]=useState();
  Theme=theme;
  // console.log(Theme);
  return (
    <div className={classes.root}>

    </div>
  );
}

export {ButtonAppBar, Theme};
