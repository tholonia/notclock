        var lastkey = {}
        function toggle(n,t) {
            n = n+1
            return n%t
        }
        window.addEventListener('keydown', function (event) {
            lastkey[event.code] = true
            lastkey[event.key] = true

            //? ────────────────────────────────────────────────
            if (lastkey['Space']) {
                log("a:"+pause)
                pause = toggle(pause,2)
                log("b:"+pause)
                if (pause == 1) {
                    last_loop_delay = loop_delay
                    loop_delay = 1000000000 
                    timer.set_interval(loop_delay);
                    log("pausing...")
                } else {
                    loop_delay = last_loop_delay
                    timer.set_interval(loop_delay);
                    log("pausing ("+loop_delay+"s)")
                }
            }

            //? ────────────────────────────────────────────────
            if (lastkey['ArrowUp']) {
                loop_delay = loop_delay - 100
                if (loop_delay < 1) {loop_delay = 10}
                timer.set_interval(loop_delay);
                log("loop delay: "+loop_delay)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['ArrowDown'])  {loop_delay = loop_delay + 100;timer.set_interval(loop_delay);log("loop delay: "+loop_delay)}

            if (lastkey['ArrowLeft'])  {line_thickness = line_thickness *  .99;log("line_thickness: "+line_thickness)}
            if (lastkey['ArrowRight']) {line_thickness = line_thickness * 1.01;log("line_thickness: "+line_thickness)}

            if (lastkey['PageDown'])   {linelength_adj = linelength_adj * 0.99;log("linelength_adj: "+linelength_adj)}
            if (lastkey['PageUp'])     {linelength_adj = linelength_adj * 1.01;log("linelength_adj: "+linelength_adj)}

            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F1']) {mladj[0]=mladj[0]+5;log("Line 1 length: "+mladj[0])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F2']) {mladj[1]=mladj[1]+5;log("Line 2 length: "+mladj[1])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F3']) {mladj[2]=mladj[2]+5;log("Line 3 length: "+mladj[2])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F4']) {mladj[3]=mladj[3]+5;log("Line 4 length: "+mladj[3])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F5']) {mladj[4]=mladj[4]+5;log("Line 5 length: "+mladj[4])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F6']) {mladj[5]=mladj[5]+5;log("Line 6 length: "+mladj[5])}

            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit1']) {mladj[0]=mladj[0]-5;log("Line 1 length: "+mladj[0])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit2']) {mladj[1]=mladj[1]-5;log("Line 2 length: "+mladj[1])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit3']) {mladj[2]=mladj[2]-5;log("Line 3 length: "+mladj[2])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit4']) { mladj[3]=mladj[3]-5;log("Line 4 length: "+mladj[3])}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit5']) {mladj[4]=mladj[4]-5;log("Line 5 length: "+mladj[4]);}
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit6']) {mladj[5]=mladj[5]-5;log("Line 6 length: "+mladj[5])}

            //? ────────────────────────────────────────────────
            if (lastkey['Home']) {
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
                log("Changing BG color")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Insert']) {deg_adj = deg_adj*2;log("Degree Adjust: "+deg_adj);let tot_ticks = parseInt(360/deg_adj);}
            if (lastkey['Delete']) {deg_adj = deg_adj/2; log("Degree Adjust: "+deg_adj); let tot_ticks = parseInt(360/deg_adj);}

            if (lastkey['Control'] && lastkey['Shift'] && lastkey['KeyZ']) {showtext = toggle(showtext,2); log("Showing text") }

            if (lastkey['Alt'] && lastkey['KeyR']) { cycle_colors= toggle(cycle_colors,num_of_colors); log("Random Colors: "+cycle_colors) }

            //! ■■■■■■■■■■■■■■■■■■■■■■■■■ vvv ■■■■■■■■■■■■■■■■■■■■■■■   CIRCLES
            if (lastkey['Alt'] && lastkey['KeyN']) {circle_radius = circle_radius + 1;log("Increasing Circle Radius: "+circle_radius)}
            if (lastkey['Alt'] && lastkey['KeyB']) {circle_radius = circle_radius - 1;log("Decreasing Circle Radius: "+circle_radius)}
            if (lastkey['Alt'] && lastkey['KeyX']) {
                circle_opacity = (parseInt((circle_opacity*100) + 1)/100)
                if (circle_opacity > 1) {circle_opacity = 1}
                log("Increasing Circle Opacity: "+circle_opacity)
            }
            //? ────────────────────────────────────────────────        TYPE
            if (lastkey['Alt'] && lastkey['KeyM']) {cycle_circles = toggle(cycle_circles,num_of_circles); log("Circle type: "+cycle_circles) }
            //? ■■■■■■■■■■■■■■■■■■■■■■■■■ ^^^ ■■■■■■■■■■■■■■■■■■■■■■■  CIRCLES
            
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyZ']) {
                circle_opacity = (parseInt((circle_opacity*100) - 2)/100)
                if (circle_opacity < 0) {circle_opacity = 0}
                log("Decreasing Circle Opacity: "+circle_opacity)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyC']) {cycle_vars = toggle(cycle_vars,2); log("Cycling vars: "+cycle_vars) }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyA']) {
                preset_changed = true
                cycle_preset = toggle(cycle_preset,num_of_presets);
                log("Cycle Presets: "+cycle_preset)
                log("Preset changed: "+preset_changed)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyV']) {cycle_poly = toggle(cycle_poly,num_of_polys);log("Show polys: "+cycle_poly)}
            if (lastkey['Alt'] && lastkey['KeyJ']) {branch_angle = branch_angle + degjump;log("degjump")}

            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit0']) {show_all_lines = toggle(show_all_lines,2); log("toggle all") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit1']) {show_0 = toggle(show_0,2); log("toggle level 1") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit2']) {show_1 = toggle(show_1,2); log("toggle level 2") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit3']) {show_2 = toggle(show_2,2); log("toggle level 3") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit4']) {show_3 = toggle(show_3,2); log("toggle level 4") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit5']) {show_4 = toggle(show_4,2); log("toggle level 5") }
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit6']) {show_5 = toggle(show_5,2);log("toggle level 6") }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['KeyY']) {
            log("state:",sound_on)
                if (sound_on == 0) {
                    initSound(sound_on);  //? sound_initialized = set to 1 in function
                    log("Sound (KeyY) Inialized")
                } else {
                    initSound(sound_on);  //? sound_initialized = set to 1 in function
                    log("Sound (KeyY) UN-Inialized")
                }
                log("sound_on before:"+sound_on)
                sound_on = toggle(sound_on,2)
                log("sound_on after:"+sound_on)
           }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyU']) { cycle_dataset = toggle(cycle_dataset,num_of_datasets); log("Using dataset "+cycle_dataset+"/"+num_of_sets) }
            if (lastkey['Alt'] && lastkey['KeyK']) { cycle_path = toggle(cycle_path,num_of_paths); log("Using path "+cycle_path, num_of_paths) }
            if (lastkey['Alt'] && lastkey['KeyG']) { cycle_audio = toggle(cycle_audio,num_of_audios); log("Using audio "+cycle_audio, num_of_audios) }
            //? ──────────────────────────────────────────────── 
            if (lastkey['Alt'] && lastkey['KeyO']) {
                poly_opacity = (parseInt((poly_opacity*100) + 3)/100)
                if (poly_opacity >1) {poly_opacity = 1}
                log("Poly opacity+: "+poly_opacity)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyI']) {
                log("Prev Poly opacity-: "+poly_opacity)
                poly_opacity = (parseInt((poly_opacity*100) - 1)/100)
                if (poly_opacity < 0) {poly_opacity = 0}
                log("New Poly opacity-: "+poly_opacity)
            }
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

