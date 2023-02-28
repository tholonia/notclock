        var lastkey = {}

        isCtl = false
        isAlt = false
        isKey = false
        isMet = false
        isSft = false
        isSftCtl = false
        isAltCtl = false
        isAltMet = false
        isCtlMet = false            


        function toggle(n,t) {
            return (n+1)%t
        }
        function dnlimit(v,step,lim) {
            v = v - step;
            if (v <lim) {v=lim}
            return v
        }
        function uplimit(v,step,lim) {
            v = v + step;
            if (v >lim) {v=lim}
            return v
        }
        function dnCircOpac(n,lim) {
            n = (parseInt((n*100) - 1)/100);
            if (n < lim) {
                n = lim
            }
            return n            
        }
        function upCircOpac(n,lim) {
            n = (parseInt((n*100) + 1)/100);
            if (n > lim) {
                n = lim
            }
            return n            
        }

        function dnPolyOpac(n,lim) {
            n = Math.round((n*100) - 1)/100
            if (n < lim) {
                n = lim
            }
            return n            
        }
        function upPolyOpac(n,lim) {
            n = Math.round((n*100) + 1)/100
            if (n > lim) {
                n = lim
            }
            console.log("po after:",n)
            return n            
        }
        function spacepause(pause) {
                pause = toggle(pause,2)
                if (pause == 1) {
                    last_loop_delay = loop_delay
                    loop_delay = 1000000000 
                    console.log("pausing for "+parseInt(loop_delay/1000)+" seconds")
                    timer.set_interval(loop_delay);
                } else {
                    loop_delay = last_loop_delay
                    console.log("resuming delay of "+loop_delay+" milliseconds")
                    timer.set_interval(loop_delay);
                }
                return pause

        }
        function homekey() {
            var svg = document.getElementById("svg");
            if (sel_bg == 1) { //white
                svg.setAttribute("style", "border:1px solid #444; background-color: #000;");
                log("Changing BG color to BLACK")
                bg_color = "black"
                sel_bg = 0
            } else {
                svg.setAttribute("style", "border:1px solid #444; background-color: #FFF;");
                log("Changing BG color to WHITE")
                bg_color = "white"
                sel_bg = 1
            }
        }

        //? ug!  another example of the horribleness of javascript
        function isOn(key) {
            if (typeof lastkey[key] === "undefined") {
                res = false
            } else {
                res = true
            }
            if (typeof lastkey[key] === "boolean") {
                res = lastkey[key]
            }
            return res
        }

        window.addEventListener('keydown', function (event) {
            lastkey[event.code] = true
            lastkey[event.key] = true

            if ( isOn('Alt') && !isOn('Control') && !isOn('Meta') && !isOn('Shift') ) {isAlt = true}
            if (!isOn('Alt') &&  isOn('Control') && !isOn('Meta') && !isOn('Shift') ) {isCtl = true}
            if (!isOn('Alt') && !isOn('Control') && !isOn('Meta') && !isOn('Shift') ) {isKey = true}
            if (!isOn('Alt') && !isOn('Control') &&  isOn('Meta') && !isOn('Shift') ) {isMet = true}
            if (!isOn('Alt') && !isOn('Control') &&  isOn('Meta') && !isOn('Shift') ) {isSft = true}

            //? CONTROL-ALT
            if ( isOn('Alt') &&  isOn('Control') && !isOn('Meta') && !isOn('Shift')) {
                isAltCtl = true;
                isCtl = false
                isAlt = false
                isSft = false
            }
            //? ALT-META
            if ( isOn('Alt') &&  !isOn('Control') && isOn('Meta') && !isOn('Shift')) {
                isAltMet = true;
                isMet = false
                isAlt = false
                isSft = false
            }
            //? CONTROL-META
            if (!isOn('Alt') &&  isOn('Control') && isOn('Meta') && !isOn('Shift')) {
                isCtlMet = true;
                isCtl = false
                isMet = false
                isSft = false
            }
            //? SHIFT-CONTROL
            if (!isOn('Alt') &&  isOn('Control') && !isOn('Meta') && isOn('Shift')) {
                isSftCtl = true;
                isCtl = false
                isMet = false
                isSft = false
                isAlt = false
            }


//            //? ──────────────────────────────────────────────── SNAPSHOT
//            if (isKey && lastkey['Backspace']) {
//                snapshot=1
//                log("Snaphot")
//            }
            //? ──────────────────────────────────────────────── BACKGROUND
            if (isKey && lastkey['Home']) {homekey();log("Changing BG color")}
            //? ──────────────────────────────────────────────── PAUSE
            if (isKey && lastkey['Space']) {pause = spacepause(pause)}
            //? ──────────────────────────────────────────────── PRESETS
            if (isAlt && lastkey['KeyA']) {preset_changed = true;cycle_preset = toggle(cycle_preset,num_of_presets);log("Cycle Presets: "+cycle_preset)}
            //? ──────────────────────────────────────────────── SOUND
            if (isCtl && lastkey['KeyY']) {initSound(sound_on);sound_on = toggle(sound_on,2);log("sound system:"+sound_on)}
            //? ──────────────────────────────────────────────── FAST/SLOW
            if (isKey && lastkey['ArrowUp']) {loop_delay = dnlimit(loop_delay,100,-200);timer.set_interval(loop_delay);log("loop delay: "+loop_delay)}
            if (isKey && lastkey['ArrowDown'])  {loop_delay = uplimit(loop_delay,100, inf);timer.set_interval(loop_delay);log("loop delay: "+loop_delay)}
            //? ──────────────────────────────────────────────── DEG 
            if (isKey && lastkey['Insert']) {deg_adj = deg_adj*2;log("Degree Adjust: "+deg_adj);let tot_ticks = parseInt(360/deg_adj);}
            if (isKey && lastkey['Delete']) {deg_adj = deg_adj/2; log("Degree Adjust: "+deg_adj); let tot_ticks = parseInt(360/deg_adj);}
            if (isAlt && lastkey['KeyJ']) {branch_angle = branch_angle + jump_delta;log("++jump_delta:"+jump_delta)}
            if (isMet && lastkey['KeyJ']) {branch_angle = branch_angle - jump_delta;log("--jump_delta:"+jump_delta)}
            //? ──────────────────────────────────────────────── FAT/THIN
            if (isKey && lastkey['ArrowLeft'])  {line_thickness = line_thickness *  .99;log("line_thickness: "+line_thickness)}
            if (isKey && lastkey['ArrowRight']) {line_thickness = line_thickness * 1.01;log("line_thickness: "+line_thickness)}
            //? ──────────────────────────────────────────────── LONG/SHORT
            if (isKey && lastkey['PageDown'])   {linelength_adj = linelength_adj * 0.99;log("linelength_adj: "+linelength_adj)}
            if (isKey && lastkey['PageUp'])     {linelength_adj = linelength_adj * 1.01;log("linelength_adj: "+linelength_adj)}
            if (isSftCtl && lastkey['Digit1']) {mladj[0]=mladj[0]-5;log("Line 1 length: "+mladj[0])}
            if (isSftCtl && lastkey['Digit2']) {mladj[1]=mladj[1]-5;log("Line 2 length: "+mladj[1])}
            if (isSftCtl && lastkey['Digit3']) {mladj[2]=mladj[2]-5;log("Line 3 length: "+mladj[2])}
            if (isSftCtl && lastkey['Digit4']) { mladj[3]=mladj[3]-5;log("Line 4 length: "+mladj[3])}
            if (isSftCtl && lastkey['Digit5']) {mladj[4]=mladj[4]-5;log("Line 5 length: "+mladj[4]);}
            if (isSftCtl && lastkey['Digit6']) {mladj[5]=mladj[5]-5;log("Line 6 length: "+mladj[5])}
            //? ──────────────────────────────────────────────── SHOW/HIDE
            if (isSftCtl && lastkey['F1']) {mladj[0]=mladj[0]+5;log("Line 1 length: "+mladj[0])}
            if (isSftCtl && lastkey['F2']) {mladj[1]=mladj[1]+5;log("Line 2 length: "+mladj[1])}
            if (isSftCtl && lastkey['F3']) {mladj[2]=mladj[2]+5;log("Line 3 length: "+mladj[2])}
            if (isSftCtl && lastkey['F4']) {mladj[3]=mladj[3]+5;log("Line 4 length: "+mladj[3])}
            if (isSftCtl && lastkey['F5']) {mladj[4]=mladj[4]+5;log("Line 5 length: "+mladj[4])}
            if (isSftCtl && lastkey['F6']) {mladj[5]=mladj[5]+5;log("Line 6 length: "+mladj[5])}
            if (isAltCtl && lastkey['Digit0']) {show_all_lines = toggle(show_all_lines,2); log("toggle all") }
            if (isAltCtl && lastkey['Digit1']) {show_0 = toggle(show_0,2); log("toggle level 1") }
            if (isAltCtl && lastkey['Digit2']) {show_1 = toggle(show_1,2); log("toggle level 2") }
            if (isAltCtl && lastkey['Digit3']) {show_2 = toggle(show_2,2); log("toggle level 3") }
            if (isAltCtl && lastkey['Digit4']) {show_3 = toggle(show_3,2); log("toggle level 4") }
            if (isAltCtl && lastkey['Digit5']) {show_4 = toggle(show_4,2); log("toggle level 5") }
            if (isAltCtl && lastkey['Digit6']) {show_5 = toggle(show_5,2);log("toggle level 6") }
            //? ──────────────────────────────────────────────── SHOW/HIDE MENU
            if (isAlt && lastkey['KeyQ']) {
                log("gullsren",fullscreen)
                if (fullscreen == 1) {
                    fullscreen = 0
                    showtext = 1
                    log("Fillscreen off, showtext on") 
                } else {
                    showtext = toggle(showtext,2); 
                    log("Showing text") 
                }
            }
            //? ──────────────────────────────────────────────── SCREENSAVE
            if (isAlt && lastkey['KeyP']) { screensave= toggle(screensave,2); log("screensave: "+screensave) }
            //? ──────────────────────────────────────────────── ZOOM
            if (isAlt && lastkey['KeyT']) {
                zoomin= toggle(zoomin,2); 
                log("Zoomin: "+zoomin) 

                //? this doesn't work here
                // if (zoomin == 1) {
                //     zoomvb(gMin_x, gMax_x, gMin_y, gMax_y)  
                //     showtext=0; //? turn off the menu, as it is unreadable
                // } else {
                //     if (gMin_x+gMax_x+gMin_y+gMax_y != 0) {
                //         zoomvb(-960, 960, -512, 512)  
                //         showtext = 1 //? turn menu back up
                //     }
                // }
            }
            //? ──────────────────────────────────────────────── RATIOS
            if (isAlt && lastkey['KeyY']) { cycle_ratios= toggle(cycle_ratios,num_of_ratios); log("Cycle Ratio: "+cycle_ratios) }
            //? ──────────────────────────────────────────────── COLRS
            if (isAlt && lastkey['KeyR']) { cycle_colors= toggle(cycle_colors,num_of_colors); log("Cycle Colors: "+cycle_colors) }
            //? ──────────────────────────────────────────────── MERGE
            if (isAlt && lastkey['KeyW']) {merge_count = dnlimit(merge_count,1,0);log("- Merge count: "+merge_count)}
            if (isAlt && lastkey['KeyS']) {merge_count = uplimit(merge_count,1,inf);log("+ Merge count: "+merge_count)}
            //? ──────────────────────────────────────────────── CIRCLES
            if (isAlt && lastkey['KeyN']) {circle_radius = uplimit(circle_radius,1,inf);log("+ Radius: "+circle_radius)}
            if (isAlt && lastkey['KeyB']) {circle_radius = dnlimit(circle_radius,1,0);log("- Radius: "+circle_radius)}
            if (isAlt && lastkey['KeyM']) {cycle_circles = toggle(cycle_circles,num_of_circles); log("Circle type: "+cycle_circles) }
            //? ──────────────────────────────────────────────── POLY
            if (isAlt && lastkey['KeyX']) {circle_opacity = upCircOpac(circle_opacity,1);log("+ Opacity: "+circle_opacity)}
            if (isAlt && lastkey['KeyZ']) {circle_opacity = dnCircOpac(circle_opacity,0);log("- Opacity: "+circle_opacity)}
            if (isAlt && lastkey['KeyO']) {
                poly_opacity = upPolyOpac(poly_opacity,1);
                // debugger
                log("+ Poly opacity: "+poly_opacity)}
            if (isAlt && lastkey['KeyI']) {poly_opacity = dnPolyOpac(poly_opacity,0);log("- Poly opacity: "+poly_opacity)}
            //? ──────────────────────────────────────────────── CYCLES
            if (isAlt && lastkey['KeyC']) {cycle_vars = toggle(cycle_vars,num_of_vars); log("Cycling vars: "+cycle_vars) }
            if (isAlt && lastkey['KeyV']) {cycle_poly = toggle(cycle_poly,num_of_polys);log("Show polys: "+cycle_poly)}
            // if (isAlt && lastkey['KeyU']) {cycle_dataset = toggle(cycle_dataset,num_of_datasets); log("Using dataset "+cycle_dataset+"/"+num_of_datasets) }
            if (isAlt && lastkey['KeyK']) {cycle_path = toggle(cycle_path,num_of_paths); log("Using path "+cycle_path, num_of_paths) }
            if (isAlt && lastkey['KeyG']) {cycle_audio = toggle(cycle_audio,num_of_audios); log("Using audio "+cycle_audio, num_of_audios) }
            if (isAlt && lastkey['KeyU']) {
                cycle_dataset = toggle(cycle_dataset,num_of_datasets); 
                console.log(cycle_dataset)
                if (cycle_dataset > 0) {
                    cycle_circles = toggle(cycle_circles,num_of_circles)
                    circle_radius = uplimit(circle_radius,15,inf)
                } else {
                    cycles_circles=0
                    circle_radius=0
                }
                log("Using dataset "+cycle_dataset+"/"+num_of_datasets) 
            }


            //@ ARGS
        });
        eleSvg.addEventListener('keyup', function (event) {
            lastkey[event.code] = false
            lastkey[event.key] = false

            isCtl = false
            isAlt = false
            isKey = false
            isMet = false
            isSft = false
            isSftCtl = false
            isAltCtl = false
            isAltMet = false
            isCtlMet = false

        });

        eleSvg.addEventListener('mousemove', ({clientX, clientY,screenX, screenY, pageX, pageY}) => {
            point.x = clientX;
            point.y = clientY;

            point.sx = screenX;
            point.sy = screenY;

            point.px = pageX;
            point.py = pageY;

                // The cursor point, translated into svg coordinates
            var cursorpt =  point.matrixTransform(eleSvg.getScreenCTM().inverse());
            point.vx =  cursorpt.x
            point.vy =  cursorpt.y
            point.va = (rad2deg(Math.atan2(point.vy,point.vx))+90+360)%360 //? rotate c-clockwise to adj

        })
        eleSvg.addEventListener('wheel', function(event) {
            if (mouse_angle==1) {
                if (event.deltaY < 0) {
//                    point_y_delta -=0.1
                } else if (event.deltaY > 0) {
//                    point_y_delta +=0.1
//                console.log("y_delta",point_y_delta)
                }
            }
//            if (event.deltaY < 0) {
//                console.log('scrolling up');
//            } else if (event.deltaY > 0) {
//                console.log('scrolling down');
//            }
        });

