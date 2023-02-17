        var lastkey = {}
        window.addEventListener('keydown', function (event) {
            lastkey[event.code] = true
            lastkey[event.key] = true
            // console.log(JSON.stringify(lastkey))

            //? ────────────────────────────────────────────────
            if (lastkey['Space']) {
                pause = (pause + 1) % 2
                if (pause == 1) {
                    last_loop_delay = loop_delay
                    loop_delay = 1000000000
                    timer.set_interval(loop_delay);
                    console.log("pausing...")
                } else {
                    loop_delay = last_loop_delay
                    timer.set_interval(loop_delay);
                    console.log("pausing ("+loop_delay+"s)")
                }
            }

            //? ────────────────────────────────────────────────
            if (lastkey['ArrowUp']) {
                loop_delay = loop_delay - 100
                if (loop_delay < 1) {loop_delay = 10}
                timer.set_interval(loop_delay);
                console.log("loop delay: "+loop_delay)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['ArrowDown']) {
                loop_delay = loop_delay + 100
                timer.set_interval(loop_delay);
                console.log("loop delay: "+loop_delay)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['ArrowLeft']) {
                line_thickness = line_thickness * .99
                console.log("line_thickness: "+line_thickness)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['ArrowRight']) {
                line_thickness = line_thickness * 1.01
                console.log("line_thickness: "+line_thickness)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['PageDown']) {
                linelength_adj = linelength_adj *0.99
                console.log("linelength_adj: "+linelength_adj)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['PageUp']) {
                linelength_adj = linelength_adj * 1.01
                console.log("linelength_adj: "+linelength_adj)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F1']) {
                mladj[0]=mladj[0]+5
                console.log("Line 1 length: "+mladj[0])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F2']) {
                mladj[1]=mladj[1]+5
                console.log("Line 2 length: "+mladj[1])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F3']) {
                mladj[2]=mladj[2]+5
                console.log("Line 3 length: "+mladj[2])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F4']) {
                mladj[3]=mladj[3]+5
                console.log("Line 4 length: "+mladj[3])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F5']) {
                mladj[4]=mladj[4]+5
                console.log("Line 5 length: "+mladj[4])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['F6']) {
                mladj[5]=mladj[5]+5
                console.log("Line 6 length: "+mladj[5])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit1']) {
                mladj[0]=mladj[0]-5
                console.log("Line 1 length: "+mladj[0])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit2']) {
                mladj[1]=mladj[1]-5
                console.log("Line 2 length: "+mladj[1])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit3']) {
                mladj[2]=mladj[2]-5
                console.log("Line 3 length: "+mladj[2])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit4']) {
                mladj[3]=mladj[3]-5
                console.log("Line 4 length: "+mladj[3])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit5']) {
                mladj[4]=mladj[4]-5
                console.log("Line 5 length: "+mladj[4])
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['Digit6']) {
                mladj[5]=mladj[5]-5
                console.log("Line 6 length: "+mladj[5])
            }

            //? ────────────────────────────────────────────────
            if (lastkey['Home']) {
                var svg = document.getElementById("svg");
                if (sel_bg == 1) { //white
                    svg.setAttribute("style", "border:1px solid #444; background-color: #000;");
                    console.log("Changing BG color to BLACK")
                    bg_color = "black"
                    sel_bg = 0
                } else {
                    svg.setAttribute("style", "border:1px solid #444; background-color: #FFF;");
                    console.log("Changing BG color to WHITE")
                    bg_color = "white"
                    sel_bg = 1
                }
                console.log("Changing BG color")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Insert']) {
                deg_adj = deg_adj*2
                console.log("Degree Adjust: "+deg_adj)
                let tot_ticks = parseInt(360/deg_adj);
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Delete']) {
                deg_adj = deg_adj/2
                console.log("Degree Adjust: "+deg_adj)
                let tot_ticks = parseInt(360/deg_adj);
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['Shift'] && lastkey['KeyZ']) {
                showtext = (showtext + 1) % 2
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyR']) {
                cycle_colors= (cycle_colors + 1) % 3
                console.log("Random Colors: "+cycle_colors)
            }
            //? ════════════════════════════════════════════════ CIRCLE RADIUS
            if (lastkey['Alt'] && lastkey['KeyN']) {
                circle_radius = circle_radius + 1
                console.log("Increasing Circle Radius: "+circle_radius)
            }
            //? ────────────────────────────────────────────────  
            if (lastkey['Alt'] && lastkey['KeyB']) {
                circle_radius = circle_radius - 1
                console.log("Decreasing Circle Radius: "+circle_radius)
            }
            

            //? ════════════════════════════════════════════════ CIRCLE OPACITY
            if (lastkey['Alt'] && lastkey['KeyX']) {
                circle_opacity = (parseInt((circle_opacity*100) + 1)/100)
                if (circle_opacity > 1) {circle_opacity = 1}
                console.log("Increasing Circle Opacity: "+circle_opacity)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyZ']) {
                circle_opacity = (parseInt((circle_opacity*100) - 2)/100)
                if (circle_opacity < 0) {circle_opacity = 0}
                console.log("Decreasing Circle Opacity: "+circle_opacity)
            }



            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyA']) {
                preset_changed = true
                cycle_preset = (cycle_preset+1) % num_of_presets 
                console.log("Cycle Presets: "+cycle_preset)
                console.log("Preset changed: "+preset_changed)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyV']) {
                cycle_poly = (cycle_poly+1) % num_of_polys 
                console.log("Show polys: "+cycle_poly)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyJ']) {
                branch_angle = branch_angle + degjump 
                console.log("degjump")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit0']) {
                    show_all_lines = (show_all_lines + 1) % 2
                    console.log("toggle all")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit1']) {
                    show_0 = (show_0 + 1) % 2
                    console.log("toggle level 1")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit2']) {
                    show_1 = (show_1 + 1) % 2
                    console.log("toggle level 2")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit3']) {
                    show_2 = (show_2 + 1) % 2
                    console.log("toggle level 3")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit4']) {
                    show_3 = (show_3 + 1) % 2
                    console.log("toggle level 4")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit5']) {
                    show_4 = (show_4 + 1) % 2
                    console.log("toggle level 5")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['Control'] && lastkey['Digit6']) {
                    show_5 = (show_5 + 1) % 2
                    console.log("toggle level 6")
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Control'] && lastkey['KeyY']) {
            console.log("state:",sound_on)
                if (sound_on == 0) {
                    initSound(sound_on);  //? sound_initialized = set to 1 in function
                    console.log("Sound (KeyY) Inialized")
                } else {
                    initSound(sound_on);  //? sound_initialized = set to 1 in function
                    console.log("Sound (KeyY) UN-Inialized")
                }
                console.log("sound_on before:"+sound_on)
                sound_on = (sound_on + 1) % 2
                console.log("sound_on after:"+sound_on)
           }
            //? ────────────────────────────────────────────────
            // if (lastkey['Alt'] && lastkey['KeyH']) { //? KeyH seems to be dead
            if (lastkey['Alt'] && lastkey['KeyU']) {
                cycle_dataset = (cycle_dataset+1) % num_of_datasets
                console.log("Using dataset "+cycle_dataset+"/"+num_of_sets)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyK']) {
                cycle_path = (cycle_path+1) % num_of_paths
                console.log("Using path "+cycle_path, num_of_paths)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyG']) {
                cycle_audio = (cycle_audio+1) % num_of_audios
                console.log("Using audio "+cycle_audio, num_of_audios)
            }
            //? ──────────────────────────────────────────────── 
            if (lastkey['Alt'] && lastkey['KeyO']) {
                poly_opacity = (parseInt((poly_opacity*100) + 3)/100)
                if (poly_opacity >1) {poly_opacity = 1}
                console.log("Poly opacity+: "+poly_opacity)
            }
            //? ────────────────────────────────────────────────
            if (lastkey['Alt'] && lastkey['KeyI']) {
                console.log("Prev Poly opacity-: "+poly_opacity)
                poly_opacity = (parseInt((poly_opacity*100) - 1)/100)
                if (poly_opacity < 0) {poly_opacity = 0}
                console.log("New Poly opacity-: "+poly_opacity)
            }
        });
        eleSvg.addEventListener('keyup', function (event) {
            lastkey[event.code] = false
            lastkey[event.key] = false
        });

        eleSvg.addEventListener('mousemove', ({clientX, clientY}) => {
            point.x = clientX;
            point.y = clientY;
        })

