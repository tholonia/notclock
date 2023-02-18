        var lastkey = {}
        function toggle(n,t) {
            nx = n+1
            return nx%t
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
                    timer.set_interval(loop_delay);
                } else {
                    loop_delay = last_loop_delay
                    timer.set_interval(loop_delay);
                }
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

        window.addEventListener('keydown', function (event) {
            lastkey[event.code] = true
            lastkey[event.key] = true

            //? ──────────────────────────────────────────────── SNAPSHOT
            if (lastkey['Backspace']) {
                snapshot=1
                log("Snaphot")
            }
            //? ──────────────────────────────────────────────── BACKGROUND
            if (lastkey['Home']) {homekey();log("Changing BG color")}
            //? ──────────────────────────────────────────────── PAUSE
            if (lastkey['Space']) {pause = spacepause(pause);log("pausing...")}
            //? ──────────────────────────────────────────────── PRESETS
            if (lastkey['Alt'] && lastkey['KeyA']) {preset_changed = true;cycle_preset = toggle(cycle_preset,num_of_presets);log("Cycle Presets: "+cycle_preset)}
            //? ──────────────────────────────────────────────── SOUND
            if (lastkey['Control'] && lastkey['KeyY']) {initSound(sound_on);sound_on = toggle(sound_on,2);log("sound system:"+sound_on)}
            //? ──────────────────────────────────────────────── FAST/SLOW
            if (lastkey['ArrowUp']) {loop_delay = dnlimit(loop_delay,100,-200);timer.set_interval(loop_delay);log("loop delay: "+loop_delay)}
            if (lastkey['ArrowDown'])  {loop_delay = uplimit(loop_delay,100, inf);timer.set_interval(loop_delay);log("loop delay: "+loop_delay)}
            //? ──────────────────────────────────────────────── DEG 
            if (lastkey['Insert']) {deg_adj = deg_adj*2;log("Degree Adjust: "+deg_adj);let tot_ticks = parseInt(360/deg_adj);}
            if (lastkey['Delete']) {deg_adj = deg_adj/2; log("Degree Adjust: "+deg_adj); let tot_ticks = parseInt(360/deg_adj);}
            if (lastkey['Alt'] && lastkey['KeyJ']) {branch_angle = branch_angle + degjump;log("degjump")}            
            //? ──────────────────────────────────────────────── FAT/THIN
            if (lastkey['ArrowLeft'])  {line_thickness = line_thickness *  .99;log("line_thickness: "+line_thickness)}
            if (lastkey['ArrowRight']) {line_thickness = line_thickness * 1.01;log("line_thickness: "+line_thickness)}
            //? ──────────────────────────────────────────────── LONG/SHORT
            if (lastkey['PageDown'])   {linelength_adj = linelength_adj * 0.99;log("linelength_adj: "+linelength_adj)}
            if (lastkey['PageUp'])     {linelength_adj = linelength_adj * 1.01;log("linelength_adj: "+linelength_adj)}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit1']) {mladj[0]=mladj[0]-5;log("Line 1 length: "+mladj[0])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit2']) {mladj[1]=mladj[1]-5;log("Line 2 length: "+mladj[1])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit3']) {mladj[2]=mladj[2]-5;log("Line 3 length: "+mladj[2])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit4']) { mladj[3]=mladj[3]-5;log("Line 4 length: "+mladj[3])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit5']) {mladj[4]=mladj[4]-5;log("Line 5 length: "+mladj[4]);}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit6']) {mladj[5]=mladj[5]-5;log("Line 6 length: "+mladj[5])}
            //? ──────────────────────────────────────────────── SHOW/HIDE
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F1']) {mladj[0]=mladj[0]+5;log("Line 1 length: "+mladj[0])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F2']) {mladj[1]=mladj[1]+5;log("Line 2 length: "+mladj[1])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F3']) {mladj[2]=mladj[2]+5;log("Line 3 length: "+mladj[2])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F4']) {mladj[3]=mladj[3]+5;log("Line 4 length: "+mladj[3])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F5']) {mladj[4]=mladj[4]+5;log("Line 5 length: "+mladj[4])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F6']) {mladj[5]=mladj[5]+5;log("Line 6 length: "+mladj[5])}
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit0']) {show_all_lines = toggle(show_all_lines,2); log("toggle all") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit1']) {show_0 = toggle(show_0,2); log("toggle level 1") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit2']) {show_1 = toggle(show_1,2); log("toggle level 2") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit3']) {show_2 = toggle(show_2,2); log("toggle level 3") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit4']) {show_3 = toggle(show_3,2); log("toggle level 4") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit5']) {show_4 = toggle(show_4,2); log("toggle level 5") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit6']) {show_5 = toggle(show_5,2);log("toggle level 6") }
            //? ──────────────────────────────────────────────── SHOW/HIDE MENU
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['KeyZ']) {
                if (fullscreen == 1) {
                    fullscreen = 0
                    showtext = 1
                    log("Fillscreen off, showtext on") 
                } else {
                    showtext = toggle(showtext,2); 
                    log("Showing text") 
                }
            }
            //? ──────────────────────────────────────────────── COLRS
            if (lastkey['Alt'] && lastkey['KeyR']) { cycle_colors= toggle(cycle_colors,num_of_colors); log("Random Colors: "+cycle_colors) }
            //? ──────────────────────────────────────────────── MERGE
            if (lastkey['Alt'] && lastkey['KeyW']) {merge_count = dnlimit(merge_count,1,0);log("- Merge count: "+merge_count)}
            if (lastkey['Alt'] && lastkey['KeyS']) {merge_count = uplimit(merge_count,1,inf);log("+ Merge count: "+merge_count)}
            //? ──────────────────────────────────────────────── CIRCLES
            if (lastkey['Alt'] && lastkey['KeyN']) {circle_radius = uplimit(circle_radius,1,inf);log("+ Radius: "+circle_radius)}
            if (lastkey['Alt'] && lastkey['KeyB']) {circle_radius = dnlimit(circle_radius,1,0);log("- Radius: "+circle_radius)}
            if (lastkey['Alt'] && lastkey['KeyM']) {cycle_circles = toggle(cycle_circles,num_of_circles); log("Circle type: "+cycle_circles) }
            //? ──────────────────────────────────────────────── POLY
            if (lastkey['Alt'] && lastkey['KeyX']) {circle_opacity = upCircOpac(circle_opacity,1);log("+ Opacity: "+circle_opacity)}
            if (lastkey['Alt'] && lastkey['KeyZ']) {circle_opacity = dnCircOpac(circle_opacity,0);log("- Opacity: "+circle_opacity)}
            if (lastkey['Alt'] && lastkey['KeyO']) {
                poly_opacity = upPolyOpac(poly_opacity,1);
                // debugger
                log("+ Poly opacity: "+poly_opacity)}
            if (lastkey['Alt'] && lastkey['KeyI']) {poly_opacity = dnPolyOpac(poly_opacity,0);log("- Poly opacity: "+poly_opacity)}
            //? ──────────────────────────────────────────────── CYCLES
            if (lastkey['Alt'] && lastkey['KeyC']) {cycle_vars = toggle(cycle_vars,2); log("Cycling vars: "+cycle_vars) }
            if (lastkey['Alt'] && lastkey['KeyV']) {cycle_poly = toggle(cycle_poly,num_of_polys);log("Show polys: "+cycle_poly)}
            if (lastkey['Alt'] && lastkey['KeyU']) {cycle_dataset = toggle(cycle_dataset,num_of_datasets); log("Using dataset "+cycle_dataset+"/"+num_of_datasets) }
            if (lastkey['Alt'] && lastkey['KeyK']) {cycle_path = toggle(cycle_path,num_of_paths); log("Using path "+cycle_path, num_of_paths) }
            if (lastkey['Alt'] && lastkey['KeyG']) {cycle_audio = toggle(cycle_audio,num_of_audios); log("Using audio "+cycle_audio, num_of_audios) }

            //@ ARGS
        });
        eleSvg.addEventListener('keyup', function (event) {
            lastkey[event.code] = false
            lastkey[event.key] = false
        });

        eleSvg.addEventListener('mousemove', ({clientX, clientY}) => {
            point.x = clientX;
            point.y = clientY;
        })

