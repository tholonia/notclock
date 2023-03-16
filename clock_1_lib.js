
//! ┌───────────────────────────────────────────────
//! │ recursive collection of nodes and edges that form a tree
//! └───────────────────────────────────────────────
//% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//%
//% ██████  ██████   █████  ██     ██ ████████ ██████  ███████ ███████ 
//% ██   ██ ██   ██ ██   ██ ██     ██    ██    ██   ██ ██      ██      
//% ██   ██ ██████  ███████ ██  █  ██    ██    ██████  █████   █████   
//% ██   ██ ██   ██ ██   ██ ██ ███ ██    ██    ██   ██ ██      ██      
//% ██████  ██   ██ ██   ██  ███ ███     ██    ██   ██ ███████ ███████ //%
//%
//% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                                                                                                                    
function drawTree(branch_angle, rotation) {

    if (merge_count == 0) {
        clearCanvas()        
    } else {
        if (tree_counter%merge_count == 0) {
            clearCanvas()
        }
    }

    if (clock_mode > 0) {
        rotation = DEF_cmRotation;
    } else {
        rotation = DEF_rotation;  //? somewhere 'rotation' is getting changed (but I can't find it!).. so reset it here
    }
    var svg = document.getElementById("svg");
    //FIXME for some reason, these angles do not appear when the angles are integers, only floats!?
    branch_angle = branch_angle%360;
    branch_angle = branch_angle + 0.00001; //? more that 4 0s and lines begin to disappear

    genangLEFT  = genang[cycle_genang][0];
    genangRIGHT = genang[cycle_genang][1];

    //% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //% ██████  ██    ██  ██████ ██      ███████     ██    ██  █████  ██████  ███████ 
    //% ██       ██  ██  ██      ██      ██          ██    ██ ██   ██ ██   ██ ██      
    //% ██        ████   ██      ██      █████       ██    ██ ███████ ██████  ███████ 
    //% ██         ██    ██      ██      ██           ██  ██  ██   ██ ██   ██      ██ 
    //% ██████     ██     ██████ ███████ ███████       ████   ██   ██ ██   ██ ███████ 
    //% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    if (cycle_vars > 0) {
// *    ██████╗██╗   ██╗ ██████╗██╗     ███████╗       ██╗   ██╗ █████╗ ██████╗ ███████╗     ██╗
// *   ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝       ██║   ██║██╔══██╗██╔══██╗██╔════╝    ███║
// *   ██║      ╚████╔╝ ██║     ██║     █████╗         ██║   ██║███████║██████╔╝███████╗    ╚██║
// *   ██║       ╚██╔╝  ██║     ██║     ██╔══╝         ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║     ██║
// *   ╚██████╗   ██║   ╚██████╗███████╗███████╗███████╗╚████╔╝ ██║  ██║██║  ██║███████║     ██║
// *    ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝╚══════╝ ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝     ╚═╝
            if (cycle_vars == 1) {
                //? no PATH lines

                // % ──────── FRUITS/FLOWERS setting ────────────────────────────────────────
                cycle_fruit = randint(-3,num_of_fruit-1);  //@ neg vals are a very bad way to increase the 0 distributions
                cycle_flowers = randint(-3,num_of_flowers-1);
                // % ────────────────────────────────────────────────────────────────────────

                for (let i=0;i<6;i++) {
                    pensize[i] = CiR(Math.round(tree_counter),0,DEF_pensize[i],0); //? use initialial values of pensize[]
                    pre_maxlengths[i] = CiR(Math.round(tree_counter),0,DEF_pre_maxlengths[i],0);  //? use initialial values of pre_maxlengths[]
                }
                cycle_circles   = randint(0, num_of_circles-1);
                circle_radius   = randint(5,20);
                cycle_colors    = randint(0,num_of_colors-1);
                circle_opacity  = randint(1,10)/10;  //@ does nothing to lines, only circles
                cycle_poly      = randint(0,num_of_polys-1);
                cycle_dataset   = randint(0,1);
                cycle_ratios    = randint(0,num_of_ratios-1);
            }

// *  ██████╗██╗   ██╗ ██████╗██╗     ███████╗       ██╗   ██╗ █████╗ ██████╗ ███████╗    ██████╗
// * ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝       ██║   ██║██╔══██╗██╔══██╗██╔════╝    ╚════██╗
// * ██║      ╚████╔╝ ██║     ██║     █████╗         ██║   ██║███████║██████╔╝███████╗     █████╔╝
// * ██║       ╚██╔╝  ██║     ██║     ██╔══╝         ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║    ██╔═══╝
// * ╚██████╗   ██║   ╚██████╗███████╗███████╗███████╗╚████╔╝ ██║  ██║██║  ██║███████║    ███████╗
 // * ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝╚══════╝ ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝

            //? paths, colors, lines
            if (cycle_vars == 2) {
                // % ──────── FRUITS/FLOWERS setting ────────────────────────────────────────
//                cycle_fruit = randint(-3,num_of_fruit-1);  //@ neg vals are a very bad way to increase the 0 distributions
//                cycle_flowers = randint(-3,num_of_flowers-1);
                // % ────────────────────────────────────────────────────────────────────────
                for (let i=0;i<6;i++) {
                    pensize[i] = CiR(Math.round(tree_counter),0,DEF_pensize[i],0); //? use initialial values of pensize[]
                    pre_maxlengths[i] = CiR(Math.round(tree_counter),0,DEF_pre_maxlengths[i],0);  //? use initialial values of pre_maxlengths[]
                }
                cycle_path      = randint(0,num_of_paths-1);
                cycle_colors    = randint(0,num_of_colors-1);
                cycle_ratios    = randint(0,num_of_ratios-1);
            }
 // * ██████╗██╗   ██╗ ██████╗██╗     ███████╗       ██╗   ██╗ █████╗ ██████╗ ███████╗    ██████╗
// * ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝       ██║   ██║██╔══██╗██╔══██╗██╔════╝    ╚════██╗
// * ██║      ╚████╔╝ ██║     ██║     █████╗         ██║   ██║███████║██████╔╝███████╗     █████╔╝
// * ██║       ╚██╔╝  ██║     ██║     ██╔══╝         ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║     ╚═══██╗
// * ╚██████╗   ██║   ╚██████╗███████╗███████╗███████╗╚████╔╝ ██║  ██║██║  ██║███████║    ██████╔╝

            //? PATHs and path_mode only
            if (cycle_vars == 3) {
                show_all_lines = 0;
                path_mode=2;

                for (let i=0;i<6;i++) {
                    pensize[i] = CiR(
                        Math.round(tree_counter),
                        1,
                        DEF_pensize[i],
                        0
                    ) //? use initial values of pensize[]
                    pre_maxlengths[i] = CiR(
                        Math.round(tree_counter),
                        1,
                        DEF_pre_maxlengths[i],
                        0
                    ) //? use initial values of pre_maxlengths[]
                }
                cycle_path      = randint(1,num_of_paths-1);
                cycle_colors    = randint(0,num_of_colors-1);

            }
// *  ██████╗██╗   ██╗ ██████╗██╗     ███████╗       ██╗   ██╗ █████╗ ██████╗ ███████╗    ██╗  ██╗
// * ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝       ██║   ██║██╔══██╗██╔══██╗██╔════╝    ██║  ██║
// * ██║      ╚████╔╝ ██║     ██║     █████╗         ██║   ██║███████║██████╔╝███████╗    ███████║
// * ██║       ╚██╔╝  ██║     ██║     ██╔══╝         ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║    ╚════██║
// * ╚██████╗   ██║   ╚██████╗███████╗███████╗███████╗╚████╔╝ ██║  ██║██║  ██║███████║         ██║
 // * ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝╚══════╝ ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝         ╚═╝

            //? no lines or paths
            if (cycle_vars == 4) {
                // % ──────── FRUITS/FLOWERS setting ────────────────────────────────────────
                cycle_fruit = randint(-3,num_of_fruit-1);  //@ neg vals are a very bad way to increase the 0 distributions
                cycle_flowers = randint(-3,num_of_flowers-1);
                // % ────────────────────────────────────────────────────────────────────────
                show_all_lines = 0;
                path_mode=2;

                for (let i=0;i<6;i++) {
                    pensize[i] = CiR(Math.round(tree_counter),0,DEF_pensize[i],0); //? use initialial values of pensize[]
                    pre_maxlengths[i] = CiR(Math.round(tree_counter),0,DEF_pre_maxlengths[i],0);  //? use initialial values of pre_maxlengths[]
                }
                cycle_circles   = randint(0, num_of_circles-1);
                circle_radius   = randint(5,20);
                cycle_colors    = randint(0,num_of_colors-1);
                circle_opacity  = randint(1,10)/10;  //@ does nothing to lines, only circles
                cycle_poly      = randint(0,num_of_polys-1);
                cycle_dataset   = randint(0,1);
                cycle_ratios    = randint(0,num_of_ratios-1);

            }
// *  ██████╗██╗   ██╗ ██████╗██╗     ███████╗       ██╗   ██╗ █████╗ ██████╗ ███████╗    ███████╗
// * ██╔════╝╚██╗ ██╔╝██╔════╝██║     ██╔════╝       ██║   ██║██╔══██╗██╔══██╗██╔════╝    ██╔════╝
// * ██║      ╚████╔╝ ██║     ██║     █████╗         ██║   ██║███████║██████╔╝███████╗    ███████╗
// * ██║       ╚██╔╝  ██║     ██║     ██╔══╝         ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║    ╚════██║
// * ╚██████╗   ██║   ╚██████╗███████╗███████╗███████╗╚████╔╝ ██║  ██║██║  ██║███████║    ███████║
 // * ╚═════╝   ╚═╝    ╚═════╝╚══════╝╚══════╝╚══════╝ ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝

            if (cycle_vars == 5) {
                //? opwave is meant to be a wandering curve
                let ang1 = Math.sin(deg2rad(randang1))
                let mod2 = randang2 + CiR(tc[4],0,3599,0)/10
                let ang2 = Math.cos(deg2rad(mod2))
                // opwave = Math.abs(ang1+ang2) * 100
                // % ──────── FRUITS/FLOWERS setting ────────────────────────────────────────
//                cycle_fruit = randint(-3,num_of_fruit-1);  //@ neg vals are a very bad way to increase the 0 distributions
//                cycle_flowers = randint(-3,num_of_flowers-1);
                // % ────────────────────────────────────────────────────────────────────────

                // % ──────── RATIO setting ────────────────────────────────────────
                //? when form is smallest, set RATIO by time
                trt = 5

                if (nowsecs(0)%15 == 0) {
                    next_ratio_change = nowsecs(0)+15
                    next_ratio =  randintEx(0,num_of_ratios-1,next_ratio)
                    cycle_ratios = next_ratio;
                }

                //? set LINE opacity by counter and xdlAry[]
                for (let i=0;i<6;i++) {
                    let c = xdlAry[i][CiR(tc[4],0,99,0)]
                    let x= CiR(c,0,1000,0)/1000
                    opacities[i] = 1
                }
                // % ──────── LINE setting ────────────────────────────────────────
                show_all_lines = 1
                var g = 0
                let tcx = []
                let tcx_bez = []
                let tcx_flat = []
                for (let i=0;i<6;i++) {
                    let v =   CiR(tc[i+1],40,100,0)
                            - CiR(tc[i+2],0,20,0)
                            + CiR(tc[i+3],0,20,0) ;
                    tcx.push(v);
                }

                for (let i=0;i<6;i++) {
                    let v = CiR(tcx[i],0,DEF_pre_maxlengths[i],0);
                    pre_maxlengths[i] = v;
                    pensize[i] = CiR(tcx[i],-(1+4),i+4,0);
                }

                // % ──────── FRUITS/FLOWERS setting ────────────────────────────────────────
                if (nowsecs(0)%17 == 0) {
                    cycle_fruit = randint(0,num_of_fruit-1);
                }
                if (nowsecs(0)%23 == 0) {
                    cycle_flowers = randint(0,num_of_flowers-1);
                }

                // % ──────── PATH setting ────────────────────────────────────────
                //? turn on PATHS
                // if (cycle_path==0) {cycle_path=1}
                path_mode = 0
                path_color = colors360[tc[10]%360];
                // path_color = "white";
                //? set PATH style by time
                if (nowsecs(0)%60 == 0) {
                    cycle_path = randintEx(1,num_of_paths-1,cycle_path);
                }

                if (bg_color == "black") {
                    path_opacity = 1//CiR(tc[5],0,100,0)/100 //? op at > 1.0 is op = 1.0
                    if (path_opacity < 0.2) {path_opacity = 0.2} //? limit opacitry to 0.2
                    path_width = CiR(tc[10]%500,1,5,0)/1; //? width incremennet by 100ths (even though fractions are prob not supported)
                }
                // if (bg_color == "white") {
                //     path_opacity = CiR(opwave,000,800,0)/999 //? op at > 1.0 is op = 1.0
                //     // path_opacity = 1
                //     path_width = CiR(tree_counter%500,1,4,0)/1;
                // }

                // % ──────── CIRCLE setting ────────────────────────────────────────
                //? set circles to SPHERES
                if (cycle_circles==0) {cycle_circles=1}  //? 1=palette color, 2=white, 3=random colors
                //? the '-2' is to eliminate the random colors which are always the last in the array
                //? set CIRCLE color by random when circles are invisible
                if (circle_opacity == 0) {
                    cycle_colors  = randintEx(0,num_of_colors-2,cycle_colors);
                }
                //? set CIRCLE radius by counter
                circle_radius   = CiR(tcx[0],0,17,0)
                //? set CIRCIE  OPACITY by counter
                circle_opacity  = CiR(tc[4],0,10,0)/10  //@ does nothing to lines, only circles

                // % ════════════════════════════════════════════════

                wait_flag = true
                last_cycle_ratios = cycle_ratios

                //? not used here
                // cycle_poly      = randint(0,num_of_polys)
                // cycle_dataset   = randint(0,1)
                // cycle_ratios    = randint(0,num_of_ratios-1)
                //? filter by seconds example
                // if (nowsecs(0)%(divs+15) == 0 && wait_flag == false) {
                //? makes fadeouts smoother
                // preop = path_opacity
                // if (path_width == 1) {path_opacity = .6} else {path_opacity = preop}
                // if (path_width == 2) {path_opacity = .86} else {path_opacity = preop}
            }
        }
    //% █████████████████████████ LOAD PRESETS ███████████████████████
    if (preset_changed == true) {
        //? read a preset query string and set all params
        //? linear cycles of presets
        // cycle_preset = (cycle_preset + 1)% num_of_presets
        // if (rolling_presets) {
        //     cycle_preset = tree_counter% num_of_presets
        // }
        //? random selection of presents
        // randint(0,num_of_presets)
        // var qsary = parseQuery(preqs[randint(0,cycle_preset)])
        var qsary = parseQuery(preqs[cycle_preset])
        //@ ARGS
        for (const key in qsary) {
            switch(key) {
                case 'up': loop_delay      = parseFloat(qsary[key]); break;  //? loop_delay can't be set here??
                case 'ia': iangle          = parseFloat(qsary[key]); break;  
                case 'de': deg_adj         = parseFloat(qsary[key]); break;  //? keep control manual
                case 'aN': circle_radius   = parseFloat(qsary[key]); break;
                case 'aO': poly_opacity    = parseFloat(qsary[key]); break;
                case 'aX': circle_opacity  = parseFloat(qsary[key]); break;
                case 'aR': cycle_colors    = qsary[key]; break;
                case 'a1': show_0          = qsary[key]; break;
                case 'a2': show_1          = qsary[key]; break;
                case 'a3': show_2          = qsary[key]; break;
                case 'a4': show_3          = qsary[key]; break;
                case 'a5': show_4          = qsary[key]; break;
                case 'a6': show_5          = qsary[key]; break;
                case 'ca0': show_all_lines  = qsary[key]; break;
                case 'aV': cycle_poly      = qsary[key]; break;
                case 'aG': cycle_audio     = qsary[key]; break;
                case 'aK': cycle_path      = qsary[key]; break;
                case 'aU': cycle_dataset   = qsary[key]; break;
                case 'aC': cycle_vars      = qsary[key]; break;
                case 'aM': cycle_circles   = qsary[key]; break;
                case 'aS': merge_counts    = qsary[key]; break;
                case 'FS': fullscreen      = qsary[key]; break;
                case 'aA':  cycle_preset   = qsary[key]; break;
                case 'aT':  zoomin         = qsary[key]; break;
                case 'aP':  screensave     = qsary[key]; break;
                case 'aY':  cycle_ratios   = qsary[key]; break;
                case 'aJ':  jump_delta     = qsary[key]; break;
                case 'li':  path_mode      = qsary[key]; break;
                case 'mF':  cycle_flowers  = qsary[key]; break;
                case 'mT':  cycle_fruit    = qsary[key]; break;
                case 'aD':  cycle_genang   = qsary[key]; break;
                case 'cm':  clock_mode    = qsary[key]; break;
                case 'aQ':  showtext       = qsary[key]; break;
                case 'mc':  merge_colors   = qsary[key]; break;
            }
        }
        preset_changed = false
        console.log("Preset changed: "+preset_changed)
    }
    //% ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

    //? ────────────────────────────────────────────────
    //? rebuild timing data based on changes in specs
    tt = cycletimes(loop_delay, deg_adj, genangLEFT, genangRIGHT)
    cycletime = tt['cycletime']
    tot_cycletime = tt['tot_cycletime']
    tot_images = tt['tot_images']

    //? ──────────────────────────────────────────────── CYCLE COLORS
    if (cycle_colors == 1) {  //? shift spectrum of 7 color
        for (let i = 0; i < 7; i++) {
            colors2[1][i] = generateColor(CiR(tree_counter + (i * 45), 0, 360, 0))
        }
    }
    if (cycle_colors == 2) {  //? random colors
        for (let i = 0; i < 7; i++) {
            colors2[num_of_colors-1][i] = generateRandomColor() //? last in array
        }
    }
    //? ────────────────────────────────────────────────
    //% █████████████ ADJUSTMENTS █████████████
    //% let noteseed = (54+tree_counter+ rotation)%108+108
    //? ────────────────────────────────────────────────

    //@ this part is very confusing...  we need to swap 'rotation' and 'branch_angle' otherwise we get lines all 
    //@ rotating in the same directions around their centers, i.e., there is no symetrical balance, only rotational uniformity.  
    //@ This swapping could also be accomplished but reversing the declared names in the function, i.e., 
    //@ 'function drawTree(rotation, branch_angle)', as this also keeps 'branch_angle' values assigned to 'branch_angle' variable. 

    //? this call has the arguments in the order they are called in 'Tree'
    // var draw_tree = new Tree(gens, this_length, start_x, start_y, branch_angle, rotation);
    //? but we need to use THIS swapped args to get symetrical results

    var draw_tree = new Tree(gens, this_length, start_x, start_y, rotation, branch_angle);
    var draw_edges = getTreeEdges(draw_tree);
    gen = 0

    //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    //*
    //* ██████   █████  ████████  █████  ███████ ███████ ████████ ███████ 
    //* ██   ██ ██   ██    ██    ██   ██ ██      ██         ██    ██      
    //* ██   ██ ███████    ██    ███████ ███████ █████      ██    ███████ 
    //* ██   ██ ██   ██    ██    ██   ██      ██ ██         ██         ██ 
    //* ██████  ██   ██    ██    ██   ██ ███████ ███████    ██    ███████ 
    //*
    //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
                                                                                              

    //? create data sets from original data

    // var bezierary_right = BezierCurve(fullary_right);
    // var bezierary_left = BezierCurve(fullary_left);

    adata_right = [] //? these hold the final data used to creates lines
    adata_left = []

    //? any cycle_path > 0 runs concurrently with "lines"
    if (cycle_path == 0) {dataform ="line"}  //? nomal lines are the default
    if (cycle_path >0 ) {dataform ="buildpath"} //? 'dataform is a flag for later processing

    //? this is the default using standrd x/y data
    if (cycle_dataset == 0) {
        draw_edges.forEach(element => {
            adata_right.push({'x':element.node_1.x, 'y':element.node_1.y})
            adata_left.push({'x':element.node_2.x, 'y':element.node_2.y})
        })
    }
    //? these are ugly and broken
    if (cycle_dataset == 1) {
        //? "bez"
        adata_right = BezierCurve(fullary_right);
        adata_left = BezierCurve(fullary_left);
    }
    if (cycle_dataset == 2) {
        //? "bezSrtx"
        adata_right = BezierCurve(fullary_right);
        adata_left = BezierCurve(fullary_left);
        adata_right = sortByKey(adata_right,'x');
        adata_left = sortByKey(adata_left,'y');
    }


    //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    //*
    //* ██████   █████  ████████ ██   ██ ███████ 
    //* ██   ██ ██   ██    ██    ██   ██ ██      
    //* ██████  ███████    ██    ███████ ███████ 
    //* ██      ██   ██    ██    ██   ██      ██ 
    //* ██      ██   ██    ██    ██   ██ ███████ 
    //*
    //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

    if (dataform=="buildpath") {
        //? build the paths
        paths = buildpath(xfullary_right)
        //? paths is just an array of 2 lists or 6 elements each...
        //? [["M0,0","M0,0","M0,0","M0,0","M0,0","M0,0"],["M0,0","M0,0","M0,0","M0,0","M0,0","M0,0",]]
        //? path_r and path_l contains 6 subarrays each

        path_r = paths[0]
        path_l = paths[1]

        //? reset arrays to initial item only
        xfullary_right = [{'g':7,'x':0,'y':0}]
        xfullary_left = [{'g':7,'x':0,'y':0}]

//        let xgen = gen

        //? each gen is a single path... "M 0,0 C 0,0..."
        //@ DEBUG Doesn't exactly do what I want
        let limiter = Math.round(1 / (Math.abs((loop_delay / 1000))))

        var newPath_r = document.createElementNS(svgns, 'path');
        var newPath_l = document.createElementNS(svgns, 'path');

        //? normal gradient settings for path_mode
        var lcx = 0.5
        var lcy = 0.3
        var lr = 0.8

        if (path_color == 0) {
            path_color = colors2[cycle_colors][gen]
        }
        //? override for path_mode when viewiun just lines


        if (path_mode > 0) {
           path_width = path_mode //? override previous setting in buildpath()
           lcx = 0.5
           lcy = 0.5
           lr = 1
        }

        //? debug/viewing overrides
        path_color = "white";
        path_opacity="1";
        path_width='3'


        //? prepare the gradiant stroke for the PATHS
        var DATdefs = document.createElementNS(svgns, 'defs');
        var gradient = document.createElementNS(svgns, 'radialGradient');
        var stops = [
            {"color": path_color,      "offset": "0%"},
            {"color": "#000000",    "offset": "100%"}
        ];

        for (var i = 0, length = stops.length; i < length; i++) {
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', stops[i].offset);
            stop.setAttribute('stop-color', stops[i].color);
            gradient.appendChild(stop);
        }
        gradient.id = 'datasetGradient';
        gradient.setAttribute('cx', lcx);
        gradient.setAttribute('cy', lcy);  //? light is slightly above horizon
        gradient.setAttribute('r', lr);
        DATdefs.appendChild(gradient);

        newPath_r.setAttribute('d', ""+path_r[gen]);
        newPath_r.setAttribute("fill-opacity", "0");
        newPath_r.setAttribute("stroke-width", path_width);
        newPath_r.setAttribute("stroke-opacity", path_opacity);
        newPath_r.setAttribute('stroke', 'url(#datasetGradient)');
        svg.appendChild(DATdefs);
        svg.appendChild(newPath_r);

        //% ████████████████ ADJUSTMENT ████████████████
        // newpensize = pensize[gen] * line_thickness

        newPath_l.setAttribute('d', ""+path_l[gen]);
        newPath_l.setAttribute("fill-opacity", "0");
        newPath_l.setAttribute("stroke-width", path_width);//path_width);//@ SD
        newPath_l.setAttribute("stroke-opacity", path_opacity);
        newPath_l.setAttribute('stroke', 'url(#datasetGradient)');
        svg.appendChild(DATdefs);
        svg.appendChild(newPath_l);
    }

    //@ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    //@
    //@                                             ██████          ██       ██████   ██████  ██████  
    //@                                            ██               ██      ██    ██ ██    ██ ██   ██ 
    //@                                            ███████          ██      ██    ██ ██    ██ ██████  
    //@                                            ██    ██         ██      ██    ██ ██    ██ ██      
    //@                                             ██████          ███████  ██████   ██████  ██                                                   
    //@
    //@ ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    //? loop through the generated data
    //? length of adata_right is 126
    for (let idx = 0; idx<adata_right.length; idx++) {
        //? set the base data vars
        nx1 = adata_right[idx].x
        ny1 = adata_right[idx].y
        nx2 = adata_left[idx].x
        ny2 = adata_left[idx].y

        xytrack(nx2,ny2);

        order = lOrder[gen] //? get the actual gen value from the gens, which goes up to 126

        //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
        //* 
        //*   ██████ ██ ██████   ██████ ██      ███████ ███████ 
        //*  ██      ██ ██   ██ ██      ██      ██      ██      
        //*  ██      ██ ██████  ██      ██      █████   ███████ 
        //*  ██      ██ ██   ██ ██      ██      ██           ██ 
        //*   ██████ ██ ██   ██  ██████ ███████ ███████ ███████ 
        //* 
        //*  ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
                                                                        
        //? add circle
        var totcirc = 3
   
        //% █████████████ ADJUSTMENTS █████████████
        var cr_rad = Math.round(circle_radius*((7-order)/3)) //? this is small so we can cycle through the circle-types

        if (clock_mode > 0) {
            cr_rad = maxlengths[order]*circle_radius;
        }


        if (cycle_circles > 0) { 
            //? prepare the gradient for the circle
            mCIRdefs[order] = document.createElementNS(svgns, 'defs');
            mCIRgradient[order] = document.createElementNS(svgns, 'radialGradient');
            mCIRcircle[order] = document.createElementNS(svgns, 'circle');

            if (cycle_circles == 1) {mCIRcolor[order] = colors2[cycle_colors][order].toString()}
            if (cycle_circles == 2) {mCIRcolor[order] = "white"}
            if (cycle_circles == 3) {mCIRcolor[order] = generateRandomColor()} 

            mCIRstops[order] = [
                {"color":  mCIRcolor[order],"offset": "0%"},
                {"color": "#000000",        "offset": "100%"}
            ];

            for (var i = 0, length = mCIRstops[order].length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', mCIRstops[order][i].offset);
                stop.setAttribute('stop-color', mCIRstops[order][i].color);
                mCIRgradient[order].appendChild(stop);
            }

            //? rotate the light source


            //? This part calcs the angle from the viewport x,y.  Not used here, but good to save
            //@ let cxr =  Math.sin(deg2rad(point.vx))/3+.5
            //@ let cyr =  Math.cos(deg2rad(point.vy))/3+.5

            //? This part converts branch_angle to angle of 'light source'
            //? +90° to adjust the coords to top=0°, then +180° to place teh light src at top when top=0°
            let cxr =  Math.cos(deg2rad(branch_angle+90+180))/3+.5
            let cyr =  Math.sin(deg2rad(branch_angle+90+180))/3+.5

            mCIRgradient[order].id = 'Gradient'+order;
            mCIRgradient[order].setAttribute('cx', cxr.toString());//'0.3');
            mCIRgradient[order].setAttribute('cy', cyr.toString());//'0.3');
            mCIRgradient[order].setAttribute('r', '1');
            mCIRdefs[order].appendChild(mCIRgradient[order]);
            //? end of prep  ----------------------------------

            mCIRcircle[order].setAttribute("id", "circles"+order);
            mCIRcircle[order].setAttribute("cx", nx2.toString());
            mCIRcircle[order].setAttribute("cy", ny2.toString());
            mCIRcircle[order].setAttribute("r", cr_rad);            
            mCIRcircle[order].setAttribute('fill', 'url(#Gradient'+order+')');
            mCIRcircle[order].setAttribute("opacity", circle_opacity);
            mCIRcircle[order].setAttribute("style","z-index:"+(current_level*10)); //? not working :/
            // mCIRcircle[order].setAttribute("style","mix-blend-mode: color;");

            svg.appendChild(mCIRdefs[order]);
            svg.appendChild(mCIRcircle[order]);
        }
        //@ ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



        //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
        //*
        //* ██████   ██████  ██      ██    ██  ██████   ██████  ███    ██ ███████ 
        //* ██   ██ ██    ██ ██       ██  ██  ██       ██    ██ ████   ██ ██      
        //* ██████  ██    ██ ██        ████   ██   ███ ██    ██ ██ ██  ██ ███████ 
        //* ██      ██    ██ ██         ██    ██    ██ ██    ██ ██  ██ ██      ██ 
        //* ██       ██████  ███████    ██     ██████   ██████  ██   ████ ███████ 
        //*
        //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
                                                                                          
        function makePolyAry(n) {
            var poly_arr = false
            if (n==1) {
                poly_arr = [
                    [nx2, ny2],
                    [
                        (nx2 - 10) * Math.cos(rotation) - (nx2 - 10) * Math.sin(rotation),
                        (ny2 + 10) * Math.cos(rotation) + (ny2 + 10) * Math.sin(rotation),
                    ],
                    [
                        (nx2 + 10) * Math.cos(rotation) - (nx2 - 10) * Math.sin(rotation),
                        (ny2 + 10) * Math.cos(rotation) + (ny2 - 10) * Math.sin(rotation),
                    ],
                ];
                xytrack(poly_arr[1][0],poly_arr[1][1],)
                xytrack(poly_arr[2][0],poly_arr[2][1],)
            }
            if (n == 2) {
                poly_arr = [
                    [nx2, ny2],
                    [
                        nx1 ,
                        CiR(Math.round(Math.abs((ny1 + 10) * Math.cos(rotation) + (ny2 + 10) * Math.sin(rotation))),-50,50,0)+ny2-ny1,
                    ],
                    [
                        nx1,
                        CiR(Math.round(Math.abs((ny1 + 10) * Math.cos(rotation) + (ny2 - 10) * Math.sin(rotation))),-50,50,0)+ny2-ny1,
                    ],
                ];
                xytrack(poly_arr[1][0],poly_arr[1][1],)
                xytrack(poly_arr[2][0],poly_arr[2][1],)
            }
            if (n == 3) {
                poly_arr = [
                    [nx2, ny2],
                    [
                        nx2 - nx2 * Math.cos(rotation),
                        ny2 + ny2 * Math.sin(rotation),
                    ],
                    [
                        nx2 + nx2 * Math.cos(rotation),
                        ny2 + ny2 * Math.sin(rotation),
                    ],
                ];
                xytrack(poly_arr[1][0],poly_arr[1][1],)
                xytrack(poly_arr[2][0],poly_arr[2][1],)

            }
            if (n == 4) { //? currently not workng
                var petal = [
                    [0, 0]
                    , [nx1 % 10, -ny1 % 10]
                    , [-nx1 % 10, ny1 % 10]
                    , [ny1 % 10, -nx1 % 10]
                    , [-ny1 % 10, nx1 % 10]
                ]
                poly_arr = []
                for (let i = 0; i < petal.length; i++) {
                    xp = petal[i][0] * 10
                    yp = petal[i][1] * 10
                    poly_arr.push({
                        'x': xp + nx2,
                        'y': yp + ny2
                    })
                }
               poly_arr = BezierCurve(poly_arr);

                var parr = []
                for (let i = 0; i < poly_arr.length; i++) {
                    parr.push([poly_arr[i].x, poly_arr[i].y])
                }
                poly_arr = parr
            }
            return poly_arr
        }

        var poly_arr = makePolyAry(cycle_poly)

        if (cycle_poly > 0) {
            updateListMinMax(poly_arr);

            //? ┌───────────────────────────────────────────────
            //? │ we have a poly, now prepare the gradients for poly and stroke for the PATHS
            //? └───────────────────────────────────────────────
            //@ !!!!!When 'defs' is defined globally, the refresh rate drops by about 80%!!!!!!
            //? ------------------------------------
            //? create the gradiant for FILL
            //? ------------------------------------
            var LGdefs = document.createElementNS(svgns, 'defs');
            var fillGradient = document.createElementNS(svgns, 'linearGradient');
            //? stops for fillGradient
            //? pick 3 colors...

            tidx = 0//tree_counter%6 //@ is actually branch_angle

            clrIdx_1 = tidx
            clrIdx_2 = (tidx+2)%6
            clrIdx_3 = (tidx+4)%6

            //? select 3 colors from the colors2 array
            let polyColor_1 = colors2[cycle_colors][clrIdx_1]
            let polyColor_2 = colors2[cycle_colors][clrIdx_2]
            let polyColor_3 = colors2[cycle_colors][clrIdx_3]


            //? for testing
            // let polyColor_1 = "#FF0000"
            // let polyColor_2 = "#00FF00"
            // let polyColor_3 = "#0000FF" 

            //? polyColor_<n>_offset is defined globally

            //? reference http://thenewcode.com/1155/Understanding-Linear-SVG-Gradients
            //@ This part was intended to show drift in the gradiant, but not working as imagined
//            offsets = normalize(
//                [
//                    (polyColor_1_offset + 1)%33,
//                    (polyColor_1_offset + polyColor_2_offset+1)%66,
//                    (polyColor_1_offset + polyColor_2_offset + polyColor_3_offset+1)%99
//                ],[1,100]
//            )
//            offsets.sort(sortNumbers);  //? make sure the offsets are sorted incrementally

            offsets = [
                CiR(tree_counter,0,60,0),//polyColor_1_offset,
                CiR(tree_counter,20,80,0),//polyColor_2_offset,
                CiR(tree_counter,40,100,0),//polyColor_3_offset
            ]

//            polyColor_1_offset = parseInt(offsets[0])
//            polyColor_2_offset = parseInt(offsets[1])
//            polyColor_3_offset = parseInt(offsets[2])

            var fillGradient_stops = [
                {"color":  polyColor_1,"offset":  offsets[0]+"%"},
                {"color":  polyColor_2,"offset":  offsets[1]+"%"},
                {"color":  polyColor_3,"offset":  offsets[2]+"%"},
            ];

            for (var i = 0, length = fillGradient_stops.length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', fillGradient_stops[i].offset);
                stop.setAttribute('stop-color', fillGradient_stops[i].color);
                fillGradient.appendChild(stop);
            }

            //? ------------------------------------
            //? create the gradiant for STROKE
            //? ------------------------------------
            var STdefs = document.createElementNS(svgns, 'defs');
            var strokeGradient = document.createElementNS(svgns, 'linearGradient');

            // let altPolyColor_1 = colors2[cycle_colors][(clrIdx_1+1)%6]
            // let altPolyColor_2 = colors2[cycle_colors][(clrIdx_2+1)%6]
            // let altPolyColor_3 = colors2[cycle_colors][(clrIdx_3+1)%6]

            let tc1 = colors2[cycle_colors][(clrIdx_1+1)%6];
            let tc2 = colors2[cycle_colors][(clrIdx_2+1)%6];
            let tc3 = colors2[cycle_colors][(clrIdx_3+1)%6];

            let altPolyColor_1 = pSBC(-0.6,tc1)
            let altPolyColor_2 = pSBC(-0.6,tc2)
            let altPolyColor_3 = pSBC(-0.6,tc3)



            //? use the same offsets
            var strokeGradient_stops = [
                {"color":  altPolyColor_1,"offset":  offsets[0]+"%"},
                {"color":  altPolyColor_2,"offset":  offsets[1]+"%"},
                {"color":  altPolyColor_3,"offset":  offsets[2]+"%"},
            ];


            for (var i = 0, length = strokeGradient_stops.length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', strokeGradient_stops[i].offset);
                stop.setAttribute('stop-color', strokeGradient_stops[i].color);
                strokeGradient.appendChild(stop);

            }

            fillGradient.id = 'fillGradient'+gen;
            fillGradient.setAttribute('x1', '0%');
            fillGradient.setAttribute('x2', '100%');
            fillGradient.setAttribute('y1', '0%');
            fillGradient.setAttribute('y2', '100%');

            strokeGradient.id = 'strokeGradient'+gen;
            strokeGradient.setAttribute('x1', '0%');
            strokeGradient.setAttribute('x2', '0%');
            strokeGradient.setAttribute('y1', '0%');
            strokeGradient.setAttribute('y2', '100%');

            LGdefs.appendChild(fillGradient);
            STdefs.appendChild(strokeGradient);

            let poly = document.createElementNS(svgns, 'polygon');
            poly.setAttribute("points", poly_arr);
            // poly.setAttribute("fill", colors2[cycle_colors][order + gens].toString());
            poly.setAttribute('fill', 'url(#fillGradient'+gen+')');
            poly.setAttribute('stroke', 'url(#strokeGradient'+gen+')');
            poly.setAttribute("opacity", poly_opacity);
            //poly.setAttribute("fill", generateRandomColor());
            //poly.setAttribute("stroke", generateRandomColor());
            poly.setAttribute("stroke-width", '1');
            poly.setAttribute("stroke-linecap", "round");

            svg.appendChild(LGdefs);
            svg.appendChild(STdefs);
            svg.appendChild(poly);
        }

        //% █████████████ ADJUSTMENTS █████████████
        newpensize = pensize[order] * line_thickness
        //% newpensize = CiR((tree_counter-order)/10*(order+1),1,10,0)

        //% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
        //%
        //% ██████  ██████   █████  ██     ██     ██      ██ ███    ██ ███████ 
        //% ██   ██ ██   ██ ██   ██ ██     ██     ██      ██ ████   ██ ██      
        //% ██   ██ ██████  ███████ ██  █  ██     ██      ██ ██ ██  ██ █████   
        //% ██   ██ ██   ██ ██   ██ ██ ███ ██     ██      ██ ██  ██ ██ ██      
        //% ██████  ██   ██ ██   ██  ███ ███      ███████ ██ ██   ████ ███████ 
        //%
        //% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                                                                           
        //? DRAW THE LINE
        //? prepare the gradient for the line
        //! The generation indexing starts at 1, not 0 !!

        linecolors = colors2[cycle_colors]
        mLINEcolor[order] = linecolors[order]


        mLINEdefs[order]    = document.createElementNS(svgns, 'defs');
        mLINEgradient[order]= document.createElementNS(svgns, 'radialGradient');
        mLINEline[order]    = document.createElementNS(svgns, 'line');

        let c1 = mLINEcolor[(Math.abs(order+1))%6]
        let c2 = mLINEcolor[order]

        mLINEstops[order] = [
            {"color": c1,   "offset": "10%"},
            {"color": c2,   "offset": "90%"},
        ];

        for (var i = 0; i < mLINEstops[order].length; i++) {
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', mLINEstops[order][i].offset);
            stop.setAttribute('stop-color', mLINEstops[order][i].color);
            mLINEgradient[order].appendChild(stop);
        }
        //? ug!  This gradiant spec is one of the worst, and it's broken as well.  radialGradient are only radial
        //? at 45 degrees, and they disappear at 0 and 90 deg.
        mLINEgradient[order].id = 'lineGradient'+gen;
        mLINEgradient[order].setAttribute('cx', "50%");
        mLINEgradient[order].setAttribute('cy', "50%");
        mLINEgradient[order].setAttribute('r', "100%");//this_length);
        mLINEdefs[order].appendChild(mLINEgradient[order]);
        //! ---------------------------------------------

        //? doesn't work here either :( 
        // if (clock_mode == 3) {
        //     let angle = ((rad2deg(Math.atan2(ny2-ny1,nx2-nx1)))+360+90)%360;
        //     let rad = maxlengths[lOrder[gen]-1]*2 *.90;
        //     if (lOrder[gen] == 0) {
        //         //? recalc base line for 4AM adj
        //         //? DOESN'T WORK HERE
        //         nx2 = Math.cos(deg2rad(angle) * rad + nx1);
        //         ny2 = Math.sin(deg2rad(angle) * rad + ny1);

        //     }
        // }

        mLINEline[order].setAttribute('x1', nx1.toString())
        mLINEline[order].setAttribute('y1', ny1.toString())
        mLINEline[order].setAttribute('x2', nx2.toString())
        mLINEline[order].setAttribute('y2', ny2.toString())

        mLINEline[order].setAttribute("id", "lines"+gen);

        if (clock_mode > 0) {
            mLINEline[order].setAttribute('stroke', mLINEcolor[order]);
        } else {
            mLINEline[order].setAttribute('stroke', 'url(#lineGradient'+gen+')');
        }
        // mLINEline[order].setAttribute("opacity", "1");
        if (clock_mode > 0) {
            mLINEline[order].setAttribute("stroke-width",(7-order));
        } else {
            mLINEline[order].setAttribute("stroke-width",newpensize);            
        }
        mLINEline[order].setAttribute("opacity", opacities[order]);

        svg.appendChild(mLINEdefs[order]);

        //? what lines to show/hide

        if (clock_mode > 0) {
            if (order == current_level) {
                if (show_all_lines == 1) {
                    if (show_0 == 1 && order == 0) {svg.appendChild(mLINEline[order]);}
                    if (show_1 == 1 && order == 1) {svg.appendChild(mLINEline[order]);}
                    if (show_2 == 1 && order == 2) {svg.appendChild(mLINEline[order]);}
                    if (show_3 == 1 && order == 3) {svg.appendChild(mLINEline[order]);}
                    if (show_4 == 1 && order == 4) {svg.appendChild(mLINEline[order]);}
                    if (show_5 == 1 && order == 5) {svg.appendChild(mLINEline[order]);}
                }
                //? placing this here ensure the polys and circles appear ON TOP of the lines they eminate from.
                //? z-index (zIndex) settings appear to do nothing :/
                let offset = 0;
                if (lOrder[gen] == 5) { //? only apply to last line
                    if (cycle_flowers > 0)  {
                        putPoly(nx2,ny2,idx);
                    }
                    if (cycle_fruit > 0)    {
                        putCircle(nx2,ny2,idx,offset);
                    }
                }
                for (let i = 0; i<6; i++) {
                    if (lOrder[gen] == i) { 
                        if (show_lines[i] == 1) {
                            putClock(nx1,ny1,nx2,ny2,i,0); 
                        }
                    }
                }
                current_level = (current_level + 1)%6;
            }
        } else {
            if (show_all_lines == 1) {
                if (show_0 == 1 && order == 0) {svg.appendChild(mLINEline[order]);}
                if (show_1 == 1 && order == 1) {svg.appendChild(mLINEline[order]);}
                if (show_2 == 1 && order == 2) {svg.appendChild(mLINEline[order]);}
                if (show_3 == 1 && order == 3) {svg.appendChild(mLINEline[order]);}
                if (show_4 == 1 && order == 4) {svg.appendChild(mLINEline[order]);}
                if (show_5 == 1 && order == 5) {svg.appendChild(mLINEline[order]);}
            }

            //? placing this here ensure the pols abd circles appear ON TOP of the lines they eminate from
            let offset = 0;
            if (lOrder[gen] == 5) { //? only apply to last line
                if (cycle_flowers > 0)  {
                    putPoly(nx2,ny2,idx);
                }
                if (cycle_fruit > 0)    {
                    putCircle(nx2,ny2,idx,offset);
                }
            }
        }
        gen++;
    };
    writeMenu()

    //! ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    //!
    //! ███████  ██████  ██    ██ ███    ██ ██████  
    //! ██      ██    ██ ██    ██ ████   ██ ██   ██ 
    //! ███████ ██    ██ ██    ██ ██ ██  ██ ██   ██ 
    //!      ██ ██    ██ ██    ██ ██  ██ ██ ██   ██ 
    //! ███████  ██████   ██████  ██   ████ ██████  
    //!
    //! ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    if (sound_initialized == 1) {

        //? make some new sounds based on vars
        alternotes = [54, 67.5, 43.2, 34.56, 84.375]
        let noteseed = (tree_counter + rotation) % 4
        let rx = randint(0, alternotes.length - 1)
        let xx = alternotes[rx] * 2

        //@ g=0: playSound_0()  Long sound
        //@ g=1: playSound_1()  Short sound
        //@ g=2: playSoundData()  snd.play(MP3) - currenly not used
        //@ g=3: playSound_2()  long and short together
        //@ g=4: playSound_3()  varible length


        //@ &g=
        let limiter = Math.round(1 / (Math.abs((loop_delay / 1000))))
        //? Play sound #1 (playSound_0 = LONG SOUND) (g=0)
        if (cycle_audio == 0 && (tree_counter % limiter == 0)) {
            // long sound
            pp = 1000 / (tree_counter % 7)
            for (let i = 1; i < 7; i++) {
                setTimeout(function () {
                    playSound_0(crosssum(rotation), i)
                }, pp * i)
            }
        }
        //? Play sound #2 (playSound_1 = SHORT SOUND)
        if (cycle_audio == 1 && (tree_counter % limiter == 0)) {
            // short sound
            pp = 1000 / (tree_counter % 7)
            for (let i = 1; i < 7; i++) {
                setTimeout(function () {
                    playSound_1(crosssum(rotation), i)
                }, pp * i)
            }
        }
        //? Play sound #3 (playSoundData = MP3-piano)
        if (cycle_audio == 2 && (tree_counter % limiter == 0)) {
            //piano notes
            pp = 1000 / (crosssum(branch_angle + branch_counter) % 4)
            for (let i = 1; i < 6; i++) {
                setTimeout(function () {
                    note = randint(0, 20)
                    playSoundData("data:audio/wav;base64," + pianoNotes[note])
                }, pp * i)
            }
        }
        //? Play sound #3 - playSound_0 + playSound_1, long and short
        if (cycle_audio == 3 & (tree_counter % limiter == 0)) {
            // long and short 
            pp = 1000 / (tree_counter % 7)
            for (let i = 1; i < 7; i++) {
                setTimeout(function () {
                    playSound_0(crosssum(rotation), i)
                }, pp * i)
                setTimeout(function () {
                    playSound_1(crosssum(rotation), i)
                }, pp * i)
            }
        }
        // //? Play sound #4 - playSound_0 + playSound_1, long and short
        // if (cycle_audio == 4 & (tree_counter % limiter == 0)) {
        //     pp = 1000 / (tree_counter % 7)
        //     for (let i = 1; i < 7; i++) {
        //         setTimeout(function () {
        //             //? rotation is actually angle :/  so angle%36= rangoe of 1-10 seconds
        //             playSound_3(crosssum(rotation)%36, i)
        //         }, pp * i)
        //     }
        // }
    }
        //! ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

//    console.log("drawBox("+gMin_x+","+gMax_x+","+gMin_y+","+gMax_y+"  w/h:"+(gMax_y-gMin_y)+"/"+(gMax_x-gMin_x)+")")
    boxWidth = Math.round(gMax_y-gMin_y)
    boxHeight = Math.round(gMax_x-gMin_x)
    boxSize = boxWidth * boxHeight
//    drawBox(gMin_x, gMax_x, gMin_y, gMax_y)
    //? this only works here (not in listeners)
    if (zoomin == 1) {
        was_zoomed = 1
        last_showtext = showtext;
        zoomvb(gMin_x, gMax_x, gMin_y, gMax_y)  
        showtext=0; //? turn off the menu, as it is unreadable
    } else {
        if (gMin_x+gMax_x+gMin_y+gMax_y != 0) {
            eleSvg.setAttribute("viewBox", "-960 -512 1920 1024");
            if (was_zoomed == 1) {
                showtext = last_showtext; //? turn menu back on
                was_zoomed = 0
            }
        }
    }}
//? END OF FUNCTION 'drawTree'
//! ┌───────────────────────────────────────────────
//! │ holds the x,y data
//! └───────────────────────────────────────────────
class Node {
    constructor(a, b) {
        this.x = a;
        this.y = b;
    }
    toString() {
        return "(" + this.x + ", " + this.y + ")";
//        return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
    }}
//! ┌───────────────────────────────────────────────
//! │ connections between nodes in a graph 
//! └───────────────────────────────────────────────
class Edge {
    constructor(node_a, node_b) {
        this.node_1 = node_a;
        this.node_2 = node_b;
    }
    toString() {
        return "[" + this.node_1.toString() + ", " + this.node_2.toString() + "]";
    }}
//! ┌───────────────────────────────────────────────
//! │ The main class that creates the x/y coords then calls drawTree
//! └───────────────────────────────────────────────
//% ████████████████████████████████████████████████████████████████████████████████████████████████
//%
//% ████████ ██████  ███████ ███████ 
//%    ██    ██   ██ ██      ██      
//%    ██    ██████  █████   █████   
//%    ██    ██   ██ ██      ██      
//%    ██    ██   ██ ███████ ███████  
//%                                         
//% ████████████████████████████████████████████████████████████████████████████████████████████████

class Tree {
    constructor(gens, lineLength, x, y, angle, rotation) {
        branch_counter++

        //? all trees have a base node

        this.base_node = new Node(x, y);
        var rel_len = false
        var realgen = (7 - gens) - 1  //? the 'gens' are indexed as 1-6

        var adjr = 0;
        if (clock_mode > 0) {adjr=90;} //? start 0h at bottom.


        var newangleLEFT  = (((angle * genangLEFT[realgen]) ) + rotation+adjr)%360;
        var newangleRIGHT = (((angle * genangRIGHT[realgen]) ) - rotation+adjr)%360;

        maxlengths = [0, 0, 0, 0, 0, 0]  //reset
        for (let i = 0; i < pre_maxlengths.length; i++) {
            maxlengths[i] = pre_maxlengths[i] + mladj[i]
        }

        //% █████████████ ADJUSTMENTS █████████████
        let newlinelength = maxlengths[realgen] * linelength_adj
        //% newlinelength = newlinelength + (CiR(parseInt(tree_counter/gens), -500,500, 0)/10) 

        if (gens > 0) {

            //% █████████████ ADJUSTMENTS █████████████
            //% cumxy[gens][0] = Math.round(cumxy[gens][0] + x)%100/100;
            //% cumxy[gens][1] = Math.round(cumxy[gens][1] + y)%100/100;
            //% if (gens == 6) {
            //%   console.log(cumxy[5][0],cumxy[5][1])
            //% }

            //? determine next node to the RIGHT in the tree with trig -->

            //? determine next node to the LEFT in the tree with trig 
            this.left_node = new Node(
                    x + (newlinelength) * Math.cos(toRadians(newangleLEFT)),
                    y + (newlinelength) * Math.sin(toRadians(newangleLEFT))
            );


            this.right_node = new Node(
                    x + (newlinelength) * Math.cos(toRadians(newangleRIGHT)),
                    y + (newlinelength) * Math.sin(toRadians(newangleRIGHT))
            );

            if (clock_mode > 0) {
                this.right_node = this.left_node;
            }



            //? push all the x.y values to a simple array
            fullary_right.push({'x':x,'y':y})

            //? push all the ADJUTSED x/y values WITH their generations number to a simple array
            xfullary_right.push({
                'g':gens,
                'x':(x + (newlinelength) * Math.cos(toRadians(newangleRIGHT))).toFixed(2),//Math.round(x*100)/100,
                'y':(y + (newlinelength) * Math.sin(toRadians(newangleRIGHT))).toFixed(2)//Math.round(y*100)/100
            })



            //? push all the x.y values to a simple array
            fullary_left.push({'x':x,'y':y})
            //? push all the ADJUTSED x/y values WITH their generations number to a simple array
            xfullary_left.push({
                'g':gens,
                'x':x + (newlinelength) * Math.cos(toRadians(newangleLEFT)),// Math.round(x*100)/100,
                'y':(y + (newlinelength) * Math.sin(toRadians(newangleRIGHT))).toFixed(2)//Math.round(y*100)/100
            })

            //<!--  create edges in the graph that connect the base node to the following nodes -->
            this.right_branch = new Edge(this.base_node, this.right_node);
            this.left_branch = new Edge(this.base_node, this.left_node);


            //<!--  generate a tree beginning at the right/left node, with a lower depth and new start angle -->               

            //? save line angle for later (clock)
            line_angles[realgen] = newangleLEFT;

            this.left_tree = new Tree(
                    gens - 1,
                    maxlengths[realgen],
                    this.left_node.x,
                    this.left_node.y,
                    newangleLEFT,
                    rotation
            );


            this.right_tree = new Tree(
                    gens - 1,
                    maxlengths[realgen],
                    this.right_node.x,
                    this.right_node.y,
                    newangleRIGHT,
                    rotation
            );

            if (clock_mode > 0) {
                 this.right_tree = this.left_tree;
            }            
        }
    }}

//% ████████████████████████████████████████████████████████████████████████████████████████████████
//% ████████████████                ████████████████                ████████████████                 
//% ████    ████    ████    ████    ████    ████    ████    ████    ████    ████    ████    ████    
//% ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  
//% █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ 
//% ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  ██  
//% ████    ████    ████    ████    ████    ████    ████    ████    ████    ████    ████    ████    
//% ████████████████                ████████████████                ████████████████                 
//% ████████████████████████████████████████████████████████████████████████████████████████████████


//! ┌───────────────────────────────────────────────
//! │ TIME: convert t-time to HMS
//! └───────────────────────────────────────────────
function ttime2hms(val) {
    return(toTimeString(ticks2secs(parseInt(val,6))));
}
//! ┌───────────────────────────────────────────────
//! │ TIME: returns epoch in seconds
//! └───────────────────────────────────────────────
function nowsecs(d) {
    var datestamp = 0;
    if (d==0) {
        datestamp = new Date();
    } else {
        datestamp = new Date(d);
    }
    var secs = new Date(datestamp).getTime()/1000;
    return secs}
//! ┌───────────────────────────────────────────────
//! │ TIME: returns epoch in seconds for NOW or ARG
//! └───────────────────────────────────────────────
function getSecsInDay(d, adj=0) {
  var e = new Date(d);
  let t = (d - e.setHours(0,0,0,0))/1000;
  t = t-adj;
  if (t<0) {t = t+86400;}
  return t;
}
//! ┌───────────────────────────────────────────────
//! │ TIME: returns epoch in HH:MM:SS format
//! └───────────────────────────────────────────────
function toTimeString(totalSeconds) {

    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;

    hms = hours.toString()+":"+minutes.toString()+":"+Math.round(seconds).toString();
    return hms;}
//! ┌───────────────────────────────────────────────
//! │ TIME: returns current seconds in the circle
//! └───────────────────────────────────────────────
function ticks2secs(t=false) {
    if (t==false) {
        t = tick_counter;
    }
    return (t * secs_per_level[5])%86400;
    // return (tick_counter * secs_per_level[5]);
}
//! ┌───────────────────────────────────────────────
//! │ TIME: returns current degrees in the circle
//! └───────────────────────────────────────────────
function ticks2degs(t=false) {
    if (t==false) {
        t = tick_counter;
    }
    return (t * degs_per_level[5])%360; 
    // return (tick_counter * degs_per_level[5]);
}
//! ┌───────────────────────────────────────────────
//! │ standalone poly routine
//! └───────────────────────────────────────────────
function putPoly(x,y,idx,offset=0) {//@ loop

    let gen = lOrder[idx]
    var svg = document.getElementById("svg");
    var poly_arr=[]
    var poly_varr_L = []
    var poly_varr_R = []

    let leaf_type = cycle_flowers;
    let poly_opacity = .5

    // % █████████ TRIS
    if (leaf_type == 1) {
//        poly_varr_R = [
//             [0,0],
//             [-10,+20],
//             [+10,+20],
//             [0,0],
//             [+20,-10],
//             [+10,-20],
//             [+0,0],
//             [-10,-20],
//             [-20,10],
//             [-0,0],
//        ]
        let v10 =CiR(tc[10]*2,1,10)
        let v20 =CiR(tc[10] *2,1,10)
//        poly_varr_R = [
//             [0,0],
//             [-(CiR(tc[1],-v10,+v10,1)),+(CiR(tc[1],+v20,-v20,1))],
//             [+(CiR(tc[1],+v10,-v10,1)),+(CiR(tc[1],+v20,-v20,1))],
//             [0,0],
//             [+(CiR(tc[1],+v20,-v20,0)),(CiR(tc[1],-v10,+v10,0))],
//             [+(CiR(tc[1],+v10,-v10,0)),-(CiR(tc[1],-v20,+v20,0))],
//             [+0,0],
//             [-(CiR(tc[1],-v10,+v10,0)),(CiR(tc[1],-v20,+v20,0))],
//             [-(CiR(tc[1],-v20,+v20,0)),+(CiR(tc[1],+v10,-v10,0))],
//             [-0,0],
//        ]
        poly_varr_R = [
             [0,0],
             [-v10,+v20],
             [+v10,+v20],
             [0,0],
             [+v20,-v10],
             [+v10,-v20],
             [+0,0],
             [-v10,-v20],
             [-v20,+v10],
             [-0,0],
        ]
    }
    // % █████████ THORNS
    if (leaf_type == 2) {
        for (let j=2; j>=0; j--) {
            for (let i=2; i>=0; i--) {
                poly_varr_R.push([randint(-20,20),randint(-20,20)]);
            }
        }
        poly_varr_R.push([0,0])
    }
    // % █████████ ARROWS
    if (leaf_type == 3) {
        poly_varr_R = [
             [0,0],
             [-10,+10],
             [+10,+10],
             [0,0],
             [+10,-10],
             [+10,-10],
             [+0,0],
             [-10,-10],
             [-10,10],
             [-0,0],
        ]
    }
    // % █████████ BIGTHORN
    if (leaf_type == 4) {
        ploy_opacity = 0.1
        let v = CiR(branch_angle,10,60,0)
        poly_varr_R = [
             [0,0],
             [-(CiR(nowsecs(0),-v,v,0))*-1,CiR(tree_counter,-v,v,0)],
             [CiR(tc[10],-v,v,0),CiR(tc[4],-v,v,0)],
             [0,0],
             [CiR(tree_counter,-v,v,0),CiR(branch_angle,-v,v,0)*-1],
             [CiR(nowsecs(0),-v,v,0),(CiR(nowsecs(0),-v,v,0))*-1],
             [+0,0],
             [(CiR(nowsecs(0),-v,v,0))*-1,(CiR(nowsecs(0),-v,v,0))*-1],
             [CiR(branch_angle,-v,v,0)*-1,CiR(branch_counter,-v,v,0)],
             [-0,0],
        ]
    }
    // % █████████ DATURA
    if (leaf_type == 5) {
        poly_varr_R = [
            [0,0],
            [0.2,0.73],
            [0.64,1.59],
            [1.12,2.21],
            [1.74,2.75],
            [2.34,2.81],
            [2.8,2.69],
            [2.76,3.31],
            [2.44,3.77],
            [2,4],
            [1.24,3.97],
            [2,4],
            [0.7,3.83],
            [0.42,3.47],
            [0,3],
            [-0.42,3.47],
            [-0.7,3.83],
            [-2,4],
            [-1.24,3.97],
            [-2,4],
            [-2.44,3.77],
            [-2.76,3.31],
            [-2.8,2.69],
            [-2.34,2.81],
            [-1.74,2.75],
            [-1.12,2.21],
            [-0.64,1.59],
            [-0.2,0.73],
            [-0,0],
        ]
        let v1= CiR(tc[12],1,12)
        let v2= CiR(tc[8],1,12)

        for (let i = 0; i<poly_varr_R.length;i++) {
            poly_varr_R[i][0] = poly_varr_R[i][0] * v1
            poly_varr_R[i][1] = poly_varr_R[i][1] * v2
        }
    }
    // % █████████ THORNS
    if (leaf_type == 6) {
        for (let j=2; j>=0; j--) {
            for (let i=2; i>=0; i--) {
                poly_varr_R.push([randint(-20,20),randint(-20,20)]);
            }
        }
        poly_varr_R.push([0,0])
    }

    //?------------------------------------------------------------------------------------

    poly_varr_L = poly_varr_R.reverse();

    if (x<0) {
        poly_varr = poly_varr_L
    } else {
        poly_varr = poly_varr_R
    }

    leaf_morph = 0

    for (let i=0;i<poly_varr.length;i++) {
        let nx = poly_varr[i][0]
        let ny = poly_varr[i][1]


       //? STANDARD leaf
        if (leaf_morph == 0) {
            //? rotate
            rby = (tree_counter%360)/10
            srby = Math.sin(rby)
            crby = Math.cos(rby)

            xny = (ny*crby) + (nx*srby)


//            if (y < 0) {
//                xny = (((ny*crby) - (nx*srby))+offset) * -1
//            } else {
//                xny = ((ny*crby) - (nx*srby)) + offset
//            }



            if (x < 0) {
                xnx = (((nx*crby) - (ny*srby))+offset) * -1
            } else {
                xnx = ((nx*crby) - (ny*srby)) + offset
            }
            px = x + xnx
            py = y + xny
        }

        poly_arr.push([px,py])
    }
    xytrack(poly_arr[2][0],poly_arr[2][1],)
    updateListMinMax(poly_arr);

    var polyfill_defs = document.createElementNS(svgns, 'defs');
    var polyfill_Gradient = document.createElementNS(svgns, 'radialGradient');

    tidx = 0//tree_counter%6 //@ is actually branch_angle

    clrIdx_1 = tidx
    clrIdx_2 = (tidx+2)%5
    clrIdx_3 = (tidx+4)%5

    // //? select 3 colors from the colors2 array
    this_color_1 = (randintEx(0,5,this_color_1))
    this_color_2 = (randintEx(0,5,this_color_2))
    this_color_3 = (randintEx(0,5,this_color_3))

     let polyColor_1 = colors2[this_color_1][clrIdx_1]
     let polyColor_2 = colors2[this_color_2][clrIdx_2]
     let polyColor_3 = colors2[this_color_3][clrIdx_3]


    //? for testing
//    let polyColor_1 = "#FF0000"
//    let polyColor_2 = "#00FF00"
//    let polyColor_3 = "#0000FF"


    offsets = [
        CiR(tree_counter,0,60,0),//polyColor_1_offset,
        CiR(tree_counter,20,80,0),//polyColor_2_offset,
        CiR(tree_counter,40,100,0),//polyColor_3_offset
    ]

    var polyfill_Gradient_stops = [
        {"color":  polyColor_1,"offset":  offsets[0]+"%"},
        {"color":  polyColor_2,"offset":  offsets[1]+"%"},
        {"color":  polyColor_3,"offset":  offsets[2]+"%"},
    ];

    for (var i = 0, length = polyfill_Gradient_stops.length; i < length; i++) {
        var stop = document.createElementNS(svgns, 'stop');
        stop.setAttribute('offset', polyfill_Gradient_stops[i].offset);
        stop.setAttribute('stop-color', polyfill_Gradient_stops[i].color);
        polyfill_Gradient.appendChild(stop);
    }

    //? ------------------------------------
    //? create the gradiant for STROKE
    //? ------------------------------------
    var polystroke_defs = document.createElementNS(svgns, 'defs');
    var polystroke_Gradient = document.createElementNS(svgns, 'linearGradient');

    let altPolyColor_1 = pSBC(-0.6,colors2[this_color_1][(clrIdx_1+1)%6])
    let altPolyColor_2 = pSBC(-0.6,colors2[this_color_2][(clrIdx_2+1)%6])
    let altPolyColor_3 = pSBC(-0.6,colors2[this_color_3][(clrIdx_3+1)%6])


    //? use the same offsets
    var polystroke_Gradient_stops = [
        {"color":  altPolyColor_1,"offset":  offsets[0]+"%"},
        {"color":  altPolyColor_2,"offset":  offsets[1]+"%"},
        {"color":  altPolyColor_3,"offset":  offsets[2]+"%"},
    ];


    for (var i = 0, length = polystroke_Gradient_stops.length; i < length; i++) {
        var stop = document.createElementNS(svgns, 'stop');
        stop.setAttribute('offset', polystroke_Gradient_stops[i].offset);
        stop.setAttribute('stop-color', polystroke_Gradient_stops[i].color);
        polystroke_Gradient.appendChild(stop);
    }

    polyfill_Gradient.id = 'fillGradient'+idx;
    polyfill_Gradient.setAttribute('cx', "50%");
    polyfill_Gradient.setAttribute('cy', "50%");
    polyfill_Gradient.setAttribute('r', '1');

    polystroke_Gradient.id = 'strokeGradient'+idx;
    polyfill_Gradient.setAttribute('cx', "50%");
    polyfill_Gradient.setAttribute('cy', "50%");
    polyfill_Gradient.setAttribute('r', '1');

    polyfill_defs.appendChild(polyfill_Gradient);
    polystroke_defs.appendChild(polystroke_Gradient);

    let poly = document.createElementNS(svgns, 'polygon');
    poly.setAttribute("points", poly_arr);
    poly.setAttribute('fill', 'url(#fillGradient'+idx+')');
    poly.setAttribute('stroke', 'url(#strokeGradient'+idx+')');
    poly.setAttribute("opacity", poly_opacity);//poly_opacity);
    poly.setAttribute("stroke-width", '1');
    poly.setAttribute("stroke-linecap", "round");

    svg.appendChild(polyfill_defs);
    svg.appendChild(polystroke_defs);
    svg.appendChild(poly);}
//! ┌───────────────────────────────────────────────
//! │ standalone circle routine
//! └───────────────────────────────────────────────
function putCircle(x,y,idx,offset) { //@ loop

    var svg = document.getElementById("svg");



    if (x < 0) {
        x = (x-offset)
    } else {
        x = (x+offset)
    }
    if (y < 0) {
        y = (y-offset)
    } else {
        y = (y+offset)
    }


    porder=idx
    pcir_circle[porder] = document.createElementNS(svgns, 'circle');

    //? prepare the gradient for the circle
    pcir_defs[porder] = document.createElementNS(svgns, 'defs');
    pcir_gradient[porder] = document.createElementNS(svgns, 'radialGradient');
    pcir_circle[porder] = document.createElementNS(svgns, 'circle');

    pcir_color[porder] = generateRandomColor()//"violet"

    pcir_stops[porder] = [
        {"color":  pcir_color[porder],"offset": "0%"},
        {"color": "#000000",        "offset": "100%"}
    ];

    for (var i = 0, length = pcir_stops[porder].length; i < length; i++) {
        var stop = document.createElementNS(svgns, 'stop');
        stop.setAttribute('offset', pcir_stops[porder][i].offset);
        stop.setAttribute('stop-color', pcir_stops[porder][i].color);
        pcir_gradient[porder].appendChild(stop);
    }

    //? rotate the light source
    //? This part calcs the angle from the viewport x,y.  Not used here, but good to save
    //@ let cxr =  Math.sin(deg2rad(point.vx))/3+.5
    //@ let cyr =  Math.cos(deg2rad(point.vy))/3+.5

    //? This part converts branch_angle to angle of 'light source'
    //? +90° to adjust the coords to top=0°, then +180° to place teh light src at top when top=0°
    let cxr =  Math.cos(deg2rad(branch_angle+90+180))/3+.5
    let cyr =  Math.sin(deg2rad(branch_angle+90+180))/3+.5

    pcir_gradient[porder].id = 'pcir_Gradient'+porder;
    pcir_gradient[porder].setAttribute('cx', cxr.toString());//'0.3');
    pcir_gradient[porder].setAttribute('cy', cyr.toString());//'0.3');
    pcir_gradient[porder].setAttribute('r', '1');
    pcir_defs[porder].appendChild(pcir_gradient[porder]);
    //? end of prep  ----------------------------------

    pcir_circle[porder].setAttribute("class", "put_circles"+porder);
    pcir_circle[porder].setAttribute("id", "put_circles"+porder);
    pcir_circle[porder].setAttribute("cx", x.toString());
    pcir_circle[porder].setAttribute("cy", y.toString());
    pcir_circle[porder].setAttribute("r", "6");
    pcir_circle[porder].setAttribute('fill', 'url(#pcir_Gradient'+porder+')');
    // pcir_circle[porder].setAttribute('fill', 'magenta');
    pcir_circle[porder].setAttribute("opacity", 1);

    svg.appendChild(pcir_defs[porder]);

    svg.appendChild(pcir_circle[porder]);}

function putDot(x,y) { //@ loop
    var svg = document.getElementById("svg");
    dot_circle = document.createElementNS(svgns, 'circle');

    dot_circle.setAttribute("class", "put_dot");
    dot_circle.setAttribute("id", "put_dot");
    dot_circle.setAttribute("cx", x.toString());
    dot_circle.setAttribute("cy", y.toString());
    dot_circle.setAttribute("r", "1");
    dot_circle.setAttribute('fill', 'white');
    dot_circle.setAttribute("opacity", 1);

    svg.appendChild(dot_circle);}

function connectDots(pts) { //@ loop
    var svg = document.getElementById("svg");
    dot_circle = document.createElementNS(svgns, 'polyline');

    dot_circle.setAttribute("points", pts);
    dot_circle.setAttribute('fill', 'white');
    dot_circle.setAttribute('stroke', 'white');
    dot_circle.setAttribute("fill-opacity", "0.0");
    dot_circle.setAttribute("stroke-width", '1');
    dot_circle.setAttribute("stroke-opacity", '1');
    // dot_circle.setAttributeNS("stroke-linecap", "round");


    svg.appendChild(dot_circle);
}


//! ┌───────────────────────────────────────────────
//! │ standalone clock marker routine
//! └───────────────────────────────────────────────
function putMarker(x,y,style) {
    var svg = document.getElementById("svg");
    let marker = document.createElementNS(svgns, 'circle');

    //? prepare the gradient for the circle
    let marker_defs = document.createElementNS(svgns, 'defs');
    let marker_gradient = document.createElementNS(svgns, 'radialGradient');
    let marker_circle = document.createElementNS(svgns, 'circle');

    let marker_color = false;
    let radius = 6;

    let cidx1 = parseInt((line_angles[0] - 90 + 360 )%360);
    let cidx2 = parseInt((line_angles[1] - 90 + 360 )%360);
    let cidx3 = parseInt((line_angles[2] - 90 + 360 )%360);
    let cidx4 = parseInt((line_angles[3] - 90 + 360 )%360);


    if (style == 4) { //? every 15 degrees
        marker_color = colors360[cidx4];//"white";
        radius = 3;
    }
    if (style == 3) { //? every 30 && !60 degrees
        marker_color = colors360[cidx3];//"cyan";
        radius = 6;
    }
    if (style == 2) { //? every 60 degrees
        marker_color = colors360[cidx2];//"red";
        radius = 7; 
    }
    if (style == 1) { //? every 0 
        marker_color = colors360[cidx1];//"white";
        radius = 12;
    }

    // marker_stops = [
    //     {"color":  marker_color,"offset": "0%"},
    //     {"color": "#000000",        "offset": "100%"}
    // ];

    // for (var i = 0, length = marker_stops.length; i < length; i++) {
    //     var stop = document.createElementNS(svgns, 'stop');
    //     stop.setAttribute('offset', marker_stops[i].offset);
    //     stop.setAttribute('stop-color', marker_stops[i].color);
    //     marker_gradient.appendChild(stop);
    // }

    // //? rotate the light source
    // //? This part calcs the angle from the viewport x,y.  Not used here, but good to save
    // //@ let cxr =  Math.sin(deg2rad(point.vx))/3+.5
    // //@ let cyr =  Math.cos(deg2rad(point.vy))/3+.5

    // //? This part converts branch_angle to angle of 'light source'
    // //? +90° to adjust the coords to top=0°, then +180° to place teh light src at top when top=0°
    // let cxr =  Math.cos(deg2rad(branch_angle+90+180))/3+.5
    // let cyr =  Math.sin(deg2rad(branch_angle+90+180))/3+.5

    // marker_gradient.id = 'marker_Gradient';
    // marker_gradient.setAttribute('cx', cxr.toString());//'0.3');
    // marker_gradient.setAttribute('cy', cyr.toString());//'0.3');
    // marker_gradient.setAttribute('r', '1');
    // marker_defs.appendChild(marker_gradient);
    //? end of prep  ----------------------------------

    marker_circle.setAttribute("class", "put_circles");
    marker_circle.setAttribute("id", "put_circles");
    marker_circle.setAttribute("cx", x.toString());
    marker_circle.setAttribute("cy", y.toString());
    marker_circle.setAttribute("r", radius.toString());
    // marker_circle.setAttribute('fill', 'url(#marker_Gradient');
    marker_circle.setAttribute('fill', marker_color);
    marker_circle.setAttribute("opacity", 1);

    svg.appendChild(marker_defs);

    svg.appendChild(marker_circle);}


//! ┌───────────────────────────────────────────────
//! │ standalone clock routine, with much of the clock logic
//! └───────────────────────────────────────────────
function putClock(x1,y1,x2,y2,idx,offset) { //@ loop
    var svg = document.getElementById("svg");
    idx=current_level;

    //? make path data
    hand_coords[idx]= {'x':x1,'y':y1};
    if (idx == 5) {
        hand_coords[6]= {'x':x2,'y':y2};
    } 
    let b_hand_coords = BezierCurve(hand_coords);
    let hand_path=[];

    let x = "M 0 0,";
    for (let i=1;i< b_hand_coords.length-1;i++) {  //? b_hand_coords has 100 elements
        j=0;
        //? Bezier curve
        // x = x + "S " +b_hand_coords[i+j].x+" "+b_hand_coords[i+j].y+",";j++;
        // x = x + "  " +b_hand_coords[i+j].x+" "+b_hand_coords[i+j].y+",";j++;
        //? Quadratic curve curve .. smoother
        x = x + "C " +b_hand_coords[i+j].x+" "+b_hand_coords[i+j].y+",";j++;
        x = x + "  " +b_hand_coords[i+j].x+" "+b_hand_coords[i+j].y+",";j++;
        x = x + "  " +b_hand_coords[i+j].x+" "+b_hand_coords[i+j].y+",";j++;

        i= i+j;
    }
    // hand_path = x + "z 0,0";  //? ugly, not smooth
    hand_path = x;
    
    //? now make path
   if (idx ==3) {
        // tot_end_pts.push([x2,y2]);  //? array
        // for (let i = 0; i<tot_end_pts.length-1; i++) {
        //     putDot(tot_end_pts[i][0],tot_end_pts[i][1],5,0);
        // }   

        // tot_end_pts_str = tot_end_pts_str + " "+x2+" "+y2;  //? string og pts
        // connectDots(tot_end_pts_str);
    }
    if (idx == 1000000) {  //? disabled for now
    // if (idx ==5) {
    
        var handpath_element = document.createElementNS(svgns, 'path');

        //? debug/viewing overrides
        path_color = "white";
        path_opacity="1";
        path_width='1'

        // path_color = colors360[tc[10]%360];

        var lcx = 0.0
        var lcy = 0.0
        var lr = 1

        //? prepare the gradiant stroke for the PATHS
        var hand_defs = document.createElementNS(svgns, 'defs');
        var gradient = document.createElementNS(svgns, 'radialGradient');
        var stops = [
            {"color": path_color,      "offset": "0%"},
            {"color": "#000000",    "offset": "100%"}
        ];

        for (var i = 0, length = stops.length; i < length; i++) {
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', stops[i].offset);
            stop.setAttribute('stop-color', stops[i].color);
            gradient.appendChild(stop);
        }
        gradient.id = 'datasetGradient';
        gradient.setAttribute('cx', lcx);
        gradient.setAttribute('cy', lcy);  //? light is slightly above horizon
        gradient.setAttribute('r', lr);
        hand_defs.appendChild(gradient);

        handpath_element.setAttribute('d', ""+hand_path);
        handpath_element.setAttribute("fill-opacity", "0");
        handpath_element.setAttribute("stroke-width", path_width);
        // handpath_element.setAttribute("stroke-opacity", path_opacity);
        // handpath_element.setAttribute('stroke', 'url(#datasetGradient)');
        handpath_element.setAttribute('stroke', 'white');
        svg.appendChild(hand_defs);
        svg.appendChild(handpath_element);
    }


    //? end path






    //? get angle
    clock_angle[idx] = ((rad2deg(Math.atan2(y2-y1,x2-x1)))+360+0)%360;
    let rad =   maxlengths[idx]*2 *.90;//@ why does it need to be adjusted?


    //? DOESN'T WORK HERE
    // if (idx == 0) {
    //     //? recalc base line for 4AM adj
    //     x2 = Math.cos(deg2rad(clock_angle[idx]+90) * rad + x1);
    //     y2 = Math.sin(deg2rad(clock_angle[idx]+90) * rad + y1);
    // }

    pcir_circle[idx] = document.createElementNS(svgns, 'circle');

    let pcir_color=colors2[cycle_colors][idx]; 

    clock_time[idx] = parseFloat(x1).toFixed(2)+"  :  "+parseFloat(y1).toFixed(2);

    if (idx == 0) { //? common hours
        cHour = Math.floor((((clock_angle[idx]+90)%360)/360)*24);
    }
    for (let i = 0;i<6;i++) {
        if (idx == i) { 

            //? this mess is to make 000000 start at 4AM at te bottom
            if (idx == 0) {clock_angle[idx] = (clock_angle[idx] + 270 % 360);}
            if (idx == 1) {clock_angle[idx] = clock_angle[idx] +120 ;}
            if (idx == 2) {clock_angle[idx] = clock_angle[idx] + 120;}
            if (idx == 3) {clock_angle[idx] = clock_angle[idx] + 120;}
            if (idx == 4) {clock_angle[idx] = clock_angle[idx] + 120;}
            if (idx == 5) {clock_angle[idx] = clock_angle[idx] + 120;}

            // let tmpt = clock_angle[idx]-90; 
            // if (clock_angle[idx] < 0) {clock_angle[idx] = clock_angle[idx]+360;}
            t_time[i] = Math.floor((clock_angle[idx]/360)*6)%6; 
        }
    }

    pcir_circle[idx].setAttribute("id", "put_clock_circles"+idx);
    pcir_circle[idx].setAttribute("cx", x1.toString());
    pcir_circle[idx].setAttribute("cy", y1.toString());
    pcir_circle[idx].setAttribute("r",rad);
    pcir_circle[idx].setAttribute("fill", pcir_color);
    pcir_circle[idx].setAttribute("fill-opacity", "0.2");
    pcir_circle[idx].setAttribute("stroke", "gray");
    pcir_circle[idx].setAttribute("stroke-width", "1");
    pcir_circle[idx].setAttribute("style","z-index:"+(current_level*10));
    pcir_circle[idx].setAttribute("style","mix-blend-mode: "+names_of_merges[merge_colors]);

    pcir_circle[idx].style.zIndex = (current_level*10).toString();

    //? https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode

    xytrack(x1+rad,y1+rad);
    xytrack(x1-rad,y1-rad);

    if (cycle_circles == 0) {  //? only put circles if spheres is turned off
        svg.appendChild(pcir_circle[idx]);
    }

    //? --------------------------------------------
    //? ----- MARKERS ------------------------------
    //? --------------------------------------------

    let mx = false;
    let my = false;
    //? put a marker at 0h
    let adj = 1.62;
    if (idx == 1) {
        let ang = 30;
        for (let i = 0; i<12; i++) {
            let tang = ang*(i+3);  //? (i+3) for 4Am bottom)
            mx = rad * adj * Math.cos(toRadians(tang))
            my = rad * adj * Math.sin(toRadians(tang))
            if (i == 0) {
                putMarker(mx,my,1);
            } else if (i%2==0) {
                putMarker(mx,my,2);
            } else  putMarker(mx,my,3);
        }
        //? marker for each hour
        ang = 15;
        for (let i = 0; i<24; i++) {
            if (i%2==0) {
                let tang = ang*(i+3);  //? (i+3) for 4Am bottom) 
                mx = rad * adj * Math.cos(toRadians(tang))
                my = rad * adj * Math.sin(toRadians(tang))
                putMarker(mx,my,4);
            }
        }
    }

    }
//! ┌───────────────────────────────────────────────
//! │ sort associative array by key
//! └───────────────────────────────────────────────
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });}
//! ┌───────────────────────────────────────────────
//! │ parse query string into associatve array
//! └───────────────────────────────────────────────
function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;}
//! ┌───────────────────────────────────────────────
//! │ interface to wTL
//! └───────────────────────────────────────────────
function writGrid(args) {

    let mCols = menuCols
    var fclrs = false
    if (bg_color == "black") {
        fclrs = ['#dddddd','yellow','white','#00ff00','white']
    } else {
        fclrs = ['grey','blue','black','green','black']
    }
    let fwght = ['300','600','500','400','300'] 


    for (let i=0;i<args.length; i++) {
        if (args[0] != '✅' && args[0] != '>') {       //? if first arg is '✅', use overrides
            menu_fontclr = fclrs[i]
            menu_fontweight=fwght[i]
        } else {
            mCols = menuAltCols
        }
        wTL({'str': args[i], 'row': rnum, 'col': mCols[i],});
    }}
//! ┌───────────────────────────────────────────────
//! │ wtite text from left->right in grod format
//! └───────────────────────────────────────────────
function wTL(args) {
    let fs = menu_fontsize
    let spacing = menu_spacing

    xpos = (args['col'] * 1) - 960  //? viewbox is x=1920 y=1024 w. 0,0 as dead center, leftmost col is -960
    ypos = (args['row'] * 20) - 450 //? topmost col is -960
    var svg = document.getElementById("svg");
    let text = document.createElementNS(svgns, 'text');
    text.id = "id-wtP1";
    text.setAttribute("style", "white-space: pre;")
    text.setAttribute("classname", "wt", );
    text.setAttribute("x", xpos);
    text.setAttribute("y", ypos);
    if (bg_color == "black") {
        text.setAttribute("fill", menu_fontclr);
    } else {
        text.setAttribute("fill", menu_fontclr);    
    }
    text.setAttribute("font-size", fs);
    text.setAttribute("font-family", "monospace, monospace");
    text.setAttribute("font-weight", menu_fontweight);
    //text.setAttribute("stroke", args['stroke']);
    //text.setAttribute("style", args['style']);
    //text.setAttribute("font-family", "Arial, Helvetica, sans-serif");

    let textNode = document.createTextNode(args['str']);
    text.appendChild(textNode);
    svg.appendChild(text);

    return (document.getElementById('id-wtP1'));}
//! ┌───────────────────────────────────────────────
//! │ wtite text from left->right in grod format
//! └───────────────────────────────────────────────
function clockWrite(xpos,ypos,str) {
    // row,col
    let fs = 40;//menu_fontsize
    let spacing = menu_spacing

    var svg = document.getElementById("svg");
    let text = document.createElementNS(svgns, 'text');
    text.id = "id-wtP2";
    text.setAttribute("style", "white-space: pre;")
    text.setAttribute("classname", "wt", );
    text.setAttribute("x", xpos);
    text.setAttribute("y", ypos);
    if (bg_color == "black") {
        text.setAttribute("fill", "gray");
    } else {
        text.setAttribute("fill", "gray");    
    }
    text.setAttribute("font-size", fs);
    text.setAttribute("font-family", "monospace, monospace");
    text.setAttribute("font-weight", menu_fontweight);
    //text.setAttribute("stroke", args['stroke']);
    //text.setAttribute("style", args['style']);
    //text.setAttribute("font-family", "Arial, Helvetica, sans-serif");

    let textNode = document.createTextNode(str);
    text.appendChild(textNode);
    svg.appendChild(text);

    return (document.getElementById('id-wtP1'));}
//! ┌───────────────────────────────────────────────
//! │ all the menu and screen text is written here
//! └───────────────────────────────────────────────
//% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//%
//% ███    ███ ███████ ███    ██ ██    ██ 
//% ████  ████ ██      ████   ██ ██    ██ 
//% ██ ████ ██ █████   ██ ██  ██ ██    ██ 
//% ██  ██  ██ ██      ██  ██ ██ ██    ██ 
//% ██      ██ ███████ ██   ████  ██████  
//% 
//% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function writeMenu() {
    //? no menu
    if (showtext == 0) {return}

    //? main menu        
    if (showtext == 1) { 
        if (fullscreen == 0) {
            //@ ARGS
            menu_fontweight="600";menu_fontclr="#00ffff"; writGrid(['✅',_,_,_,'⌥ = Alt']);
            menu_fontweight="600";menu_fontclr="#00ff00"; writGrid(['✅',_,_,'⇧ = Shift']);
            menu_fontweight="600";menu_fontclr="#ff00ff"; writGrid(['✅',_,'^ = Ctrl']);
            menu_fontweight="600";menu_fontclr="#ffFF00"; writGrid(['✅','⌘ = Meta']);
            rnum++;
    //        menu_fontweight="600";menu_fontclr="red"; writGrid(['✅','NOTE:']);rnum++;
            //? the above are all written on the same line, as they have no "rnum++' at the end.
            writGrid(['°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°']);rnum++;
            menu_fontweight="300"
            writGrid([_,'HOME','Toggle BG (B/W)']);rnum++;
            writGrid(['up','▲ ▼','+fast|-slow','(' + loop_delay / 1000 + 's)']);rnum++;
            writGrid([_,'◀▶','-thinner|+wider','('+pensize+')']);rnum++;
            writGrid([_,'PGUP/PGDN','+zoom in|-zoom out','(x '+linelength_adj + ')']);rnum++;
            writGrid(['de','INS/DEL','+Finer°|Courser°','(' + deg_adj + '°)']);rnum++;

            let shortdegs = [0,0,0,0,0,0];
            for (i=0;i<6;i++) {
                shortdegs[i] = Math.round(pre_maxlengths[i]);
            }

            writGrid([_,'^⇧(F1-F6)','lines(1-6) +longer','('+ shortdegs+')']);rnum++;
            writGrid([_,'^⇧(1-6)','lines(1-6) -shorter']);rnum++;
            writGrid([_]);rnum++;

            writGrid(['aM','⌥ M','Cycle circles','(' + cycle_circles + '/'+num_of_circles+') ' +names_of_circles[cycle_circles]]);rnum++;
            writGrid(['aR','⌥ R','Cycle colors','(' + cycle_colors + '/'+num_of_colors+') ' +names_of_colors[cycle_colors]]);rnum++;
            writGrid(['aG','⌥ G','Cycle audio','(' + cycle_audio  + '/'+num_of_audios+') '+names_of_audios[cycle_audio]]);rnum++;
            writGrid(['aU','⌥ U','Cycle dataset','(' + cycle_dataset+ '/'+num_of_datasets+') '+names_of_datasets[cycle_dataset]]);rnum++;
            writGrid(['aK','⌥ K','Cycle paths','(' + cycle_path   + '/'+num_of_paths+') ['+path_opacity+':'+path_width+'] '+names_of_paths[cycle_path]]);rnum++;
            writGrid(['aV','⌥ V','Cycle Polygons','(' + cycle_poly   + '/'+num_of_polys+') '+names_of_polys[cycle_poly]]);rnum++;
            writGrid(['aA','⌥ A','Cycle Presets','(' + cycle_preset + '/'+num_of_presets+')']);rnum++;
            writGrid(['aC','⌥ C','Cycle Vars'   ,'(' + cycle_vars+   ') '+    names_of_vars[cycle_vars]]);      rnum++;
            writGrid(['aY','⌥ Y','Cycle Ratios' ,'(' + cycle_ratios+ ') '+  names_of_ratios[cycle_ratios]]);    rnum++;
            writGrid(['mF','⌘ F','Cycle Flowers','(' + cycle_flowers+') '+ names_of_flowers[cycle_flowers]]);   rnum++;
            writGrid(['mT','⌘ T','Cycle Fruit'  ,'(' + cycle_fruit+  ') '+   names_of_fruit[cycle_fruit]]);     rnum++;
            writGrid(['mc','⌘ C','Cycle Merge (clock)'  ,'(' + merge_colors+  ') '+   names_of_merges[merge_colors]]);     rnum++;
            writGrid([_]);rnum++;
            writGrid(['aN','⌥ (N|B)','Circle radius  +/-',   '(' +circle_radius.toFixed(2)+')']);rnum++;
            writGrid(['aX','⌥ (X|Z)','Circle opacity +/-',   '(' +circle_opacity+')']);rnum++;
            writGrid(['aO','⌥ (O|I)','Poly opacity   +/-',   '(' + poly_opacity + ')']);rnum++;
            writGrid(['aS','⌥ (S|W)','Merge Count   +/-',   '(' + merge_count + ')']);rnum++;
            writGrid(['aD','⌥ .','GenAng',   names_of_genang[cycle_genang]]);rnum++;
            writGrid(['aJ','(⌥|⌘) J','Jump fwd/back '+jump_delta+'°']);rnum++;
            writGrid([_]);rnum++;
            writGrid(['ca1-ca6','^⌥ (1-6)','Toggle Hide lvl 1-6',   '(' + show_0 + show_1 + show_2 + show_3 + show_4 + show_5 + ')']);rnum++;
            writGrid(['ca0','^⌥ 0','Show/Hide All Lines','(' + show_all_lines + ') '+names_of_show_all_lines[show_all_lines]]);rnum++;
            writGrid([_]);rnum++;
            writGrid([_,'⌥ Q','Show/Hide this menu','('+names_of_showtext[showtext]+')']);rnum++;
            writGrid([_,'^Y','Toggle audio','(' + sound_initialized + ')']);rnum++;
            writGrid(['aP','⌥ P','Screen Save','(' + screensave + ')']);rnum++;
            writGrid([_,'SPACE','Pause/Run']);rnum++;
            writGrid([_]);rnum++;
            writGrid([_]);rnum++;
            if (loop_delay < 4) {
                menu_fontweight="600";menu_fontclr="RED";
                writGrid(['✅','WARNING',"Too fast: Expect unpredictable results and/or browser crash (eventually)."]);rnum++;
            } else {
                writGrid([_]);rnum++;
            }
            writGrid([_]);rnum++;
            writGrid([_]);rnum++;
            writGrid(['Query String']);rnum++;
            let qs = makeQs(href).match(/.{1,140}/g);  //? limit chars to line to 140, return array of lines
            let ba = (branch_angle % 360).toFixed(2)
            for (let i=0;i<qs.length;i++) {
                menu_fontweight="600";menu_fontclr="RED";
                writGrid([qs[i]]);rnum++;
            }
            rnum++;
            menu_fontweight="600";menu_fontclr="RED";
            writGrid(['>',"x="+point.vx+" y="+point.vy+"  a="+(point.va).toFixed(12)+"°"]);rnum++;
            writGrid(['TIME PER CYCLE: ['+cycletime+']/ sec: '+seconds+' / Bifurcation: '+ba+"° / Count: "+tree_counter+' / opwave:'+opwave.toFixed(2)]);rnum++;
            writGrid(['v.'+_VERSION+ " https://github.com/tholonia/notclock"]);rnum++;
            rnum = 0;
        }
    }

    //? degrees only (clock mode)
    if (showtext == 2) { 
        if (loop_delay < 4) {
            menu_fontweight="800";menu_fontclr="RED";
            writGrid(["  !  ",_]);
        }
        writGrid([_,branch_angle.toFixed(6)]);rnum++;
        rnum = 0;
    }

    //? stats (clock mode)
    if (showtext == 3) {  
        if (loop_delay < 4) {  //? show "too fast" warning
            menu_fontweight="800";menu_fontclr="RED";
            writGrid(["  !  ",_]);
        }
        menu_fontweight="300";menu_fontclr="RED";
        writGrid([_,"CLOCK"]);rnum++;
        rnum++;

        if (zoomin == 0) {
            writGrid([_,"t_time",_,t_time]);rnum++;
            writGrid([_,"tick_counter",_,tick_counter]);rnum++;
            writGrid([_,"tc Deg",_,ticks2degs()]);rnum++;
            writGrid([_,"tc Sec",_,ticks2secs()]);rnum++;
            let current_secs = ticks2secs();

            // if (clock_mode == 3) { 
            if (clock_mode > 0) { //@ X
                current_secs = current_secs +14400;
                if (current_secs > 86400) {
                    current_secs = current_secs - 86400;
                }
            }
            writGrid([_,"tc HMS",_,toTimeString(current_secs)]);rnum++;

            // //for (let i = 5;i>-1;i--) {
            // // writGrid([_,iching_line_names[i],t_time[i],iching_stages[4][t_time[i]]]);rnum++;
            // //}
            // let ichinghex = 0
            // let tris = [false,false,false];
            // for (let i = 5;i>-1;i--) {
            //     let line_yinyang = t_time[i]%2;//? even number
            //     if (line_yinyang == iching_line_vals[i]) { //? matches line type
            //         writGrid([_,iching_line_names[i],t_time[i],iching_stages[0][i]]);rnum++;
            //         ichinghex = ichinghex + 2**i;
            //     } else {
            //         writGrid([_]);rnum++;
            //         //writGrid([_,iching_line_names[i],t_time[i],"-"+iching_stages[4][i]]);rnum++;
            //     }
            //     //writGrid([_,"xx",ichinghex]);rnum++;
            // }
            // writGrid([_,"Hex",ichinghex]);rnum++;            

        }
        rnum = 0;
    }}


//% ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    
//! ┌───────────────────────────────────────────────
//! │ build tfe query string
//! └───────────────────────────────────────────────
function makeQs(qs) {
    qs = qs + "?"
    if (loop_delay      != DEF_loop_delay)      {qs = qs + "up="  + loop_delay;}
    if (iangle          != DEF_iangle)          {qs = qs + "&ia=" + iangle;}
    if (deg_adj         != DEF_deg_adj)         {qs = qs + "&de=" + deg_adj;}
    if (circle_radius   != DEF_circle_radius)   {qs = qs + "&aN=" + circle_radius;}
    if (cycle_colors    != DEF_cycle_colors)    {qs = qs + "&aR=" + cycle_colors;}

    if (show_all_lines  != DEF_show_all_lines)  {qs = qs + "&ca0=" + show_all_lines;}

    if (show_0 != DEF_show_0) {qs = qs + "&ca1=" + show_0;}
    if (show_1 != DEF_show_1) {qs = qs + "&ca2=" + show_1;}
    if (show_2 != DEF_show_2) {qs = qs + "&ca3=" + show_2;}
    if (show_3 != DEF_show_3) {qs = qs + "&ca4=" + show_3;}
    if (show_4 != DEF_show_4) {qs = qs + "&ca5=" + show_4;}
    if (show_5 != DEF_show_5) {qs = qs + "&ca6=" + show_5;}

    if (cycle_poly      != DEF_cycle_poly)      {qs = qs + "&aV=" + cycle_poly;}
    if (poly_opacity    != DEF_poly_opacity)    {qs = qs + "&aO=" + poly_opacity;}
    if (cycle_audio     != DEF_cycle_audio)     {qs = qs + "&aG=" + cycle_audio;}
    if (circle_opacity  != DEF_circle_opacity)  {qs = qs + "&aX=" + circle_opacity;}
    if (cycle_path      != DEF_cycle_path)      {qs = qs + "&aK=" + cycle_path;}
    if (cycle_dataset   != DEF_cycle_dataset)   {qs = qs + "&aU=" + cycle_dataset;}
    if (cycle_preset    != DEF_cycle_preset)    {qs = qs + "&aA=" + cycle_preset;}
    if (cycle_vars      != DEF_cycle_vars)      {qs = qs + "&aC=" + cycle_vars;}
    if (cycle_circles   != DEF_cycle_circles)   {qs = qs + "&aM=" + cycle_circles;}
    if (merge_count     != DEF_merge_count)     {qs = qs + "&aS=" + merge_count;}
    if (zoomin          != DEF_zoomin)          {qs = qs + "&aT=" + zoomin;}
    if (screensave      != DEF_screensave)      {qs = qs + "&aP=" + screensave;}
    if (cycle_ratios    != DEF_cycle_ratios)    {qs = qs + "&aY=" + cycle_ratios;}
    if (jump_delta      != DEF_jump_delta)      {qs = qs + "&aJ=" + jump_delta;}
    if (path_mode       != DEF_path_mode)       {qs = qs + "&li=" + path_mode;}
    if (cycle_flowers   != DEF_cycle_flowers)   {qs = qs + "&mF=" + cycle_flowers;}
    if (cycle_fruit     != DEF_cycle_fruit)     {qs = qs + "&mT=" + cycle_fruit;}
    if (cycle_genang    != DEF_cycle_genang)    {qs = qs + "&aD=" + cycle_genang;}
    if (clock_mode      != DEF_clock_mode)      {qs = qs + "&cm=" + clock_mode;}
    if (showtext        != DEF_showtext)        {qs = qs + "&aQ=" + showtext;}
    if (merge_colors     != DEF_merge_colors)   {qs = qs + "&mc=" + merge_colors;}
    qs = qs + "&ia=" + branch_angle;
    //@ ARGS
    return(qs)}
//! ┌───────────────────────────────────────────────
//! │ funcs to track tey min/max xy
//! └───────────────────────────────────────────────
function xytrack(x,y) {
    if (zoomin == 1) { //? only track if zoom is on
        if ((x+circle_radius) > gMax_x) {gMax_x = (x+circle_radius);}
        if ((x-circle_radius) < gMin_x) {gMin_x = (x-circle_radius);}
        if ((y+circle_radius) > gMax_y) {gMax_y = (y+circle_radius);}
        if ((y-circle_radius) < gMin_y) {gMin_y = (y-circle_radius);}}
    }
//! ┌───────────────────────────────────────────────
//! │ test x/y min/max vals againt a list of x/y data
//! └───────────────────────────────────────────────
function updateListMinMax(data) {
    //? no need to track if zoom is not on
    for (let i=0;i<data.length;i++) {
        xytrack(data[i][0],data[i][1]);
    }
}
//! ┌───────────────────────────────────────────────
//! │ test x/y min/max vals againt anobject of x/y data
//! └───────────────────────────────────────────────
function updateObjMinMax(data) {
    for (let i=0;i<data.length;i++) {
        for (let j=0;j<data[i].length;j++){
            xytrack(data[i][j].x,data[i][j].y);
        }
    }
}
//! ┌───────────────────────────────────────────────
//! │ zoom in the viewbox 
//! └───────────────────────────────────────────────
function zoomvb(xmin, xmax, ymin, ymax) {
    let len = Math.round(xmax-xmin);
    let hei = Math.round(ymax-ymin);

    vbMaxX = xmax+100;
    vbMaxY = ymax+100;
    vbMinX = xmin-100;
    vbMinY = ymin-100;
    vbLen = vbMaxX-vbMinX;
    vbHei = vbMaxY-vbMinY;

    let vbstr =  vbMinX.toString()+" "+vbMinY.toString()+" "+vbLen.toString()+" "+vbHei.toString();
    eleSvg.setAttribute("viewBox", vbstr);

    if (clock_mode > 0) {
        // wTLp(vbMinX,vbMinY+20,ttimeStr(t_time) + "   ("+new Date()+")");
        // clockWrite(vbMinX+100,vbMaxY-20,t_time.join(''));
        clockWrite(vbMinX,vbMaxY-20,t_time.join(':'));
        clockWrite(vbMinX+400,vbMaxY-20,new Date().toTimeString().split(' ')[0]);
    }
}
//! ┌───────────────────────────────────────────────
//! │ draw a box around the min/max xy... mainly for debugging
//! └───────────────────────────────────────────────
function drawBox(xmin, xmax, ymin, ymax) {
    let len = Math.round(xmax-xmin);
    let hei = Math.round(ymax-ymin);
    box = document.createElementNS(svgns, 'rect');
    box.setAttribute('x', xmin);
    box.setAttribute('y', ymin);
    box.setAttribute('width', len);
    box.setAttribute('height', hei);
    box.setAttribute("fill", "white");
    box.setAttribute("opacity", "0.1");
    box.setAttribute("stroke", "white");
    box.setAttribute("stroke-width", '1');
    eleSvg.appendChild(box);

    vbMaxX = xmax+100;
    vbMaxY = ymax+100;
    vbMinX = xmin-100;
    vbMinY = ymin-100;
    vbLen = vbMaxX-vbMinX;
    vbHei = vbMaxY-vbMinY;

    // let vbstr =  vbMinX.toString()+" "+vbMinY.toString()+" "+vbLen.toString()+" "+vbHei.toString();
    // eleSvg.setAttribute("viewBox", vbstr);

    zoomvb(xmin, xmax, ymin, ymax);}
//! ┌───────────────────────────────────────────────
//! │ func to alter the colors
//! └───────────────────────────────────────────────
//? https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors#:~:text=Just%20pass%20in%20a%20string,number%20(i.e.%20%2D20%20).
// /*** Log Blending ***/
// // Shade (Lighten or Darken)
// pSBC ( 0.42, color1 ); // rgb(20,60,200) + [42% Lighter] => rgb(166,171,225)
// pSBC ( -0.4, color5 ); // #F3A + [40% Darker] => #c62884
// pSBC ( 0.42, color8 ); // rgba(200,60,20,0.98631) + [42% Lighter] => rgba(225,171,166,0.98631)

// // Shade with Conversion (use "c" as your "to" color)
// pSBC ( 0.42, color2, "c" ); // rgba(20,60,200,0.67423) + [42% Lighter] + [Convert] => #a6abe1ac

// // RGB2Hex & Hex2RGB Conversion Only (set percentage to zero)
// pSBC ( 0, color6, "c" ); // #F3A9 + [Convert] => rgba(255,51,170,0.6)

// // Blending
// pSBC ( -0.5, color2, color8 ); // rgba(20,60,200,0.67423) + rgba(200,60,20,0.98631) + [50% Blend] => rgba(142,60,142,0.83)
// pSBC ( 0.7, color2, color7 ); // rgba(20,60,200,0.67423) + rgb(200,60,20) + [70% Blend] => rgba(168,60,111,0.67423)
// pSBC ( 0.25, color3, color7 ); // #67DAF0 + rgb(200,60,20) + [25% Blend] => rgb(134,191,208)
// pSBC ( 0.75, color7, color3 ); // rgb(200,60,20) + #67DAF0 + [75% Blend] => #86bfd0

// /*** Linear Blending ***/
// // Shade (Lighten or Darken)
// pSBC ( 0.42, color1, false, true ); // rgb(20,60,200) + [42% Lighter] => rgb(119,142,223)
// pSBC ( -0.4, color5, false, true ); // #F3A + [40% Darker] => #991f66
// pSBC ( 0.42, color8, false, true ); // rgba(200,60,20,0.98631) + [42% Lighter] => rgba(223,142,119,0.98631)

// // Shade with Conversion (use "c" as your "to" color)
// pSBC ( 0.42, color2, "c", true ); // rgba(20,60,200,0.67423) + [42% Lighter] + [Convert] => #778edfac

// // RGB2Hex & Hex2RGB Conversion Only (set percentage to zero)
// pSBC ( 0, color6, "c", true ); // #F3A9 + [Convert] => rgba(255,51,170,0.6)

// // Blending
// pSBC ( -0.5, color2, color8, true ); // rgba(20,60,200,0.67423) + rgba(200,60,20,0.98631) + [50% Blend] => rgba(110,60,110,0.83)
// pSBC ( 0.7, color2, color7, true ); // rgba(20,60,200,0.67423) + rgb(200,60,20) + [70% Blend] => rgba(146,60,74,0.67423)
// pSBC ( 0.25, color3, color7, true ); // #67DAF0 + rgb(200,60,20) + [25% Blend] => rgb(127,179,185)
// pSBC ( 0.75, color7, color3, true ); // rgb(200,60,20) + #67DAF0 + [75% Blend] => #7fb3b9

// /*** Other Stuff ***/
// // Error Checking
// pSBC ( 0.42, "#FFBAA" ); // #FFBAA + [42% Lighter] => null??(Invalid Input Color)
// pSBC ( 42, color1, color5 ); // rgb(20,60,200) + #F3A + [4200% Blend] => null??(Invalid Percentage Range)
// pSBC ( 0.42, {} ); // [object Object] + [42% Lighter] => null??(Strings Only for Color)
// pSBC ( "42", color1 ); // rgb(20,60,200) + ["42"] => null??(Numbers Only for Percentage)
// pSBC ( 0.42, "salt" ); // salt + [42% Lighter] => null??(A Little Salt is No Good...)

// // Error Check Fails?(Some Errors are not Caught)
// pSBC ( 0.42, "#salt" ); // #salt + [42% Lighter] => #a5a5a500??(...and a Pound of Salt is Jibberish)

// // Ripping
// pSBCr ( color4 ); // #5567DAF0 + [Rip] => [object Object] => {'r':85,'g':103,'b':218,'a':0.941}    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";

const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}

//! ┌───────────────────────────────────────────────
//! │ user to alter array of gradiant stops
//! └───────────────────────────────────────────────
function sortNumbers(a, b) {
  if (a > b) {
    return 1;
  } else if (b > a) {
    return -1;
  } else {
    return 0;
  }}
//! ┌───────────────────────────────────────────────
//! │ copy a list
//! └───────────────────────────────────────────────  
function cpList(list) {
    let nList = [];
    for (let i=0; i<list.length;i++) {
        nList.push(list[i])
    }
    return nList}
//! ┌───────────────────────────────────────────────
//! │ Convert HSV to RGB
//! └───────────────────────────────────────────────
function HSVtoRGB(h, s, v) { //? excpects h,s,v to be in range from 0...1
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) { //? in case the arg is an object
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6); //? identify the 6 color ranges
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    return "#" 
        + Math.round(r * 255).toString(16).padStart(2,'0') 
        + Math.round(g * 255).toString(16).padStart(2,'0') 
        + Math.round(b * 255).toString(16).padStart(2,'0');
    }
//! ┌───────────────────────────────────────────────
//! │ Convert HSV to RGB
//! └───────────────────────────────────────────────
function HSVtoRGBArray(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {  
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }
    // return {Math.round(r * 255),Math.round(g * 255),Math.round(b * 255)}
    return  { 
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255)
            };}
//! ┌───────────────────────────────────────────────
//! │ Creates RGB string from a number
//! └───────────────────────────────────────────────
function generateColor(num) {
    var H = (num%360) / 360 //? H range is 0-360, 0 and 360 are both RED
    //@ probably better to MOD the H, not divide
    var S = .8
    var V = .8
    return HSVtoRGB(H, S, V)}
//! ┌───────────────────────────────────────────────
//! │ Creates RGB string from a number and SV vals
//! └───────────────────────────────────────────────
function generateColorHSV(num,S,V) {
    var H = num / 360 //? H range is 0-360, 0 and 360 are both RED
    //@ probably better to MOD the H, not divide
    return HSVtoRGB(H, S, V)}
//! ┌───────────────────────────────────────────────
//! │Randmo color between #000000 and #FFFFFF
//! └───────────────────────────────────────────────
function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`}
//@ DEBUG this can be made better with a 2-phase flipping MOD
//! ┌───────────────────────────────────────────────
//! │ take any number and find the equivalent value on a cycle of n.  For example,
//! │ for a cycle of 3-7, the number 11 would return 5
//! │
//! │ In this version, the input number is divided into the length of the cycle, 
//! │ resulting in rounding (duplication and jumps)
//! │
//! │ n=3-7 -> 3, 4, 5, 6, 7, 6, 5, 4, 3, 4, 5, 6, 7, 6, 5, 4, 3, 4... <- cycle values
//! │          0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17... <- for input number
//! │          3, 4, 4, 5, 5, 6, 6, 7, 6, 6, 5, 5, 4, 4, 3, 4, 4, 5... <- return value 
//! └───────────────────────────────────────────────
function CiR(number, amin, amax, invert = 0) {
    //@ e.g, CiR(45, 3, 20, invert = 0)
    try {
        mod_num = number % amax  //? get number within range... 45 % 20 = 5
    } catch {
        mod_num = 0
    }

    try {
        mod_num2 = number % (amax * 2) //? get next val - 45 % 40 = 5
    } catch {
        mod_num2 = 0
    }

    new_val1 = Math.abs(mod_num2 - (mod_num * 2)) //? 5 - 10 = -5 = 5

    old_min = 0
    old_min = 0
    old_max = amax //? 20
    new_max = amax //? 20
    new_min = amin //? 3

//    //? create array for curve
//    curveAry = []
//    for (let i = amin; i<amax;i++) { curveAry.push(amin) }
//    for (let i = amin; i<amax;i++) { curveAry.push(i) }
//    for (let i = amin; i<amax;i++) { curveAry.push(amax) }
//
//    cary = []
//    for (let i = 0; i<curveAry.length-4;i++) {
//        avg = (curveAry[i]+ curveAry[i+1]+ curveAry[i+2]+ curveAry[i+3]+ curveAry[i+4]+ curveAry[i+5])/6;
//        if (i%3==0) {
//            cary.push(avg)
//         }
//    }
//    cary2 = []
//    for (let i = 0 ; i<cary.length/2 ; i++) {
//        cary2.push(cary[i])
//    }
//    for (let i=cary.length/2 ; i<cary.length ; i++) {
//        cary2.push(parseInt(cary[i]))
//    }

//@ e.g, CiR(45, 3, 20, invert = 0)
//@                    ((5-0) / (20-0 )) * (20-3) + 3
//@                    (5 / 20 ) * 17 + 3
//@                    0.25 * 17 + 3
//@                    4.25 + 3
//@                    7.25
//@                    7

try {
       new_value = ((new_val1 - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min
    } catch {
        new_value = 0
    }
    if (invert == 1) {
        new_value = amax - new_value
    }
    return (Math.round(new_value))

    return cary[Math.round(new_value)]}
//! ┌───────────────────────────────────────────────
//! │ a failed attempt to create a CiR that returns a bezier curve
//! └───────────────────────────────────────────────    
function CiR2(number, nmin,nmax,amin, amax, invert = 0) {
    //? create array of amax elements
    rary = []

    for (let i=nmin;i<nmax;i++) {
        rary.push(i)
    }
    newnums = normalize(rary,[amin,amax])

    newval = newnums[number]+amin
    return newval}
//! ┌───────────────────────────────────────────────
//! │ Used in Bezier Curve
//! └───────────────────────────────────────────────
function factorial(n) {
    if (n < 0)
        return(-1); /*Wrong value*/
    if (n == 0)
        return(1);  /*Terminating condition*/
    else
    {
        return(n * factorial(n - 1));
    }}
//! ┌───────────────────────────────────────────────
//! │ Used in Bezier Curve
//! └───────────────────────────────────────────────
function nCr(n, r) {
    // log(n+','+r)
    // log(factorial(n))
    // log(factorial(r))
    // log(factorial(n-r))
    res = factorial(n) / (factorial(r) * factorial(n - r));

    if (isNaN(res)) {
        return(0)
    } else {
        return(res)
    }}
//! ┌───────────────────────────────────────────────
//! │ JSON output
//! └───────────────────────────────────────────────
function jstr(obj) {
    console.log(JSON.stringify(obj),null,2)}
//! ┌───────────────────────────────────────────────
//! │ convenience functions
//! └───────────────────────────────────────────────
function log(txt) {
    console.log(txt)}
function call_log(txt) {
    console.log("\t\t"+txt)}
//! ┌───────────────────────────────────────────────
//! │ Create Bezier curve form a list of values
//! └───────────────────────────────────────────────
function BezierCurve(points) {
    //? expect data for be array of associative arrays of x/y values
    //? [{"x":-64.25896664854749,"y":12.508200260460674},{"x":-89.73634559153838,"y":4.5384851983379075},{"x":-38.78158770555659,"y":20.477915322583442},{"x":-56.28925158642472,"y":37.98557920345157},{"x":-72.22868171067026,"y":-12.969178682530222}]

    let n = points.length;
    let curvepoints = [];
    for (let u = 0; u <= 1; u += 0.01) {
        let p = {x: 0, y: 0};
        for (let i = 0; i < n; i++) {
            let B = nCr(n - 1, i) * Math.pow((1 - u), (n - 1) - i) * Math.pow(u, i);
            let px = points[i].x * B;
            let py = points[i].y * B;
            p.x += px;
            p.y += py;
        }
        curvepoints.push(p);
    }
    return curvepoints;}
//! ┌───────────────────────────────────────────────
//! │ crossums and series or number to a single digit, i.e., -1.2E3 = 1+2+3=6
//! └───────────────────────────────────────────────
function crosssum(val) {
    let sval = String("" + val)
    sval = sval.replace("-", "")
    sval = sval.replace("+", "")
    sval = sval.replace("e", "")
    sval = sval.replace("E", "")
    sval = sval.replace(".", "")

    let rval = 0
    for (let i = 0; i < sval.length; i++) {
        try {
            rval = rval + parseInt(sval[i])
        } catch (error) {
            let x = 1
        }
    }
    if (rval > 9) {
        rval = crosssum(rval)
    }
    return(rval)}
//! ┌───────────────────────────────────────────────
//! │Fron Adam... no dea what this is
//! └───────────────────────────────────────────────
function next() {
    return}
//! ┌───────────────────────────────────────────────
//! │ moves data series to a min/max range 
//! └───────────────────────────────────────────────
const normalize = (set, range = [0, 1]) => {
    if (range.length > 2 || !Array.isArray(set) || !Array.isArray(range))
        throw new Error("invalid arguments to normalize");

    const min = Math.min(...set);
    let newSet = set.map(n => n - min);
    const max = Math.max(...newSet);
    newSet = newSet.map(n => n / max);

    // newSet is now in range [0, 1]
    let newRange = range[1] - range[0];
    let initial = range[0];

    // normalized = (array * new range) + range[0];
    return newSet.map(n => n * newRange + initial);};
//! ┌───────────────────────────────────────────────
//! │ Javascript math library trig functions take radians and not degrees by default 
//! └───────────────────────────────────────────────
function toRadians(angle) {
    return angle * Math.PI / 180;}
//! ┌───────────────────────────────────────────────
//! │ traverse a tree object and return the edges in the form of a list
//! └───────────────────────────────────────────────
function getTreeEdges(tree) {
    if (tree.left_tree) {
        var edges = getTreeEdges(tree.right_tree).concat(getTreeEdges(tree.left_tree));
        edges.push(tree.left_branch);
        edges.push(tree.right_branch);
        return edges;
    } else {
        return [];
    }}
//! ┌───────────────────────────────────────────────
//! │ Remove all children on the SVG canvas                                             
//! └───────────────────────────────────────────────
function clearCanvas() {
    const myNode = document.getElementById("svg");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }}
//! ┌───────────────────────────────────────────────
//! │ ??? reverse engineer the generation level based on the points generated
//! └───────────────────────────────────────────────
function getLevel(p) {
    for (let n = 12; n >= 0; n--) {
        if (p >= 2 ** n) {
            return (n)
        }
    }
    return (0)}
//! ┌───────────────────────────────────────────────
//! │ return string of time data
//! └───────────────────────────────────────────────
function TimeCalculator(seconds) {
    let y = Math.floor(seconds / 31536000);
    let mo = Math.floor((seconds % 31536000) / 2628000);
    let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
    let h = Math.floor((seconds % (3600 * 24)) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);

    let yDisplay = y > 0 ? y + (y === 1 ? " year, " : " years, ") : "";
    let moDisplay = mo > 0 ? mo + (mo === 1 ? " month, " : " months, ") : "";
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds ") : "";
    return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay;}
//! ┌───────────────────────────────────────────────
//! │ returns array of time data
//! └───────────────────────────────────────────────
function TimeAry(seconds) {
    let y = Math.floor(seconds / 31536000);
    let mo = Math.floor((seconds % 31536000) / 2628000);
    let d = Math.floor(((seconds % 31536000) % 2628000) / 86400);
    let h = Math.floor((seconds % (3600 * 24)) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);
    return {
        'Y': y,
        'M': mo,
        'D': d,
        'h': h,
        'm': m,
        's': s
    }}
//! ┌───────────────────────────────────────────────
//! │ return random integer
//! └───────────────────────────────────────────────
function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;}
//! ┌───────────────────────────────────────────────
//! │ return random integer EXCEPT a particular number
//! └───────────────────────────────────────────────
function randintEx(min, max, excluded) {
    var n = Math.floor(Math.random() * (max - min) + min);
    if (n >= excluded) n++;
    return n;}
//! ┌───────────────────────────────────────────────
//! │ converts degrees to radians
//! └───────────────────────────────────────────────
function deg2rad(degrees) {
    let pi = Math.PI;
    return degrees / (180.0 / pi);}
//! ┌───────────────────────────────────────────────
//! │ converts radians to degrees
//! └───────────────────────────────────────────────
function rad2deg(radians) {
    let pi = Math.PI;
    return radians * (180.0 / pi);}
//! ┌───────────────────────────────────────────────
//! │ a (failed) attemped to calculates the total time of the cycles
//! └───────────────────────────────────────────────
function cycletimes(loop_delay, deg_adj, leftary, rightary) {
    let tot_ticks = parseInt(360 / deg_adj);
    cycletime = TimeCalculator(tot_ticks * (loop_delay / 1000));

    ltot = leftary[0];
    rtot = rightary[0];
    for (let j = 1; j < leftary.length; j++) {
        ltot = ltot * leftary[j];
    }
    for (let k = 1; k < rightary.length; k++) {
        rtot = rtot * rightary[k];
    }
    lrdif = Math.abs(rtot - ltot) + 1
    tot_images = (parseInt(360 / deg_adj) * (loop_delay / 1000)) * rtot * lrdif
    tot_cycletime = TimeCalculator(tot_images)
    return {
        'cycletime': cycletime,
        'tot_cycletime': tot_cycletime,
        'tot_images': tot_images
    }}
//! ┌───────────────────────────────────────────────
//! │ general loop timer with variable delay
//! └───────────────────────────────────────────────
var timer = {
    running: false,
    iv: 5000,
    timeout: false,
    cb: function () {},
    start: function (cb, iv) {
        var elm = this;
        clearInterval(this.timeout);
        this.running = true;
        if (cb)
            this.cb = cb;
        if (iv)
            this.iv = iv;
        this.timeout = setTimeout(function () {
            elm.execute(elm)
        }, this.iv);
    },
    execute: function (e) {
        if (!e.running)
            return false;
        e.cb();
        e.start();
    },
    stop: function () {
        this.running = false;
    },
    set_interval: function (iv) {
        clearInterval(this.timeout);
        this.start(false, iv);
    }};
var timer2 = {
    running: false,
    iv: 5000,
    timeout: false,
    cb: function () {},
    start: function (cb, iv) {
        var elm = this;
        clearInterval(this.timeout);
        this.running = true;
        if (cb)
            this.cb = cb;
        if (iv)
            this.iv = iv;
        this.timeout = setTimeout(function () {
            elm.execute(elm)
        }, this.iv);
    },
    execute: function (e) {
        if (!e.running)
            return false;
        e.cb();
        e.start();
    },
    stop: function () {
        this.running = false;
    },
    set_interval: function (iv) {
        clearInterval(this.timeout);
        this.start(false, iv);
    }};
//! ┌───────────────────────────────────────────────
//! │ array of frequencies based on a single freuency
//! └───────────────────────────────────────────────
function getNotes(basenote) {
    var nFreq = []
    for (let n = -6; n < 6; n++) {
        nFreq.push(basenote * 2 ** (n / 12))
    }
    return nFreq}
//! ┌───────────────────────────────────────────────
//! │ only frequencoes that are 5:4 ratio, as they are the most harmonious
//! └───────────────────────────────────────────────
function getHarmoniousNotes(basenote) {
    var nFreq = []
    for (let n = 1; n < 8; n++) {
        //nFreq.push(basenote * 2.5 *n*2)
        //if ((n % 2)==0) {
        let this_note = nFreq.push(parseFloat(basenote * 1.25 * n * 2)).toFixed(2)
        if (this_note > 600) {
            this_note = this_note / 2
        }
        nFreq.push(parseFloat(basenote * 1.25 * n * 2)).toFixed(2)
        //}
    }
    return nFreq}
//! ┌───────────────────────────────────────────────
//! │ Init AudioContext, called by a user action (CTRL-Y in this case)
//! └───────────────────────────────────────────────
function initSound(state) {
    //var osc = []
    var osc = []
    var gain = []
    var freq = []
    var basenote = 432
    //var nFreq = getHarmoniousNotes(108)

    if (state == 0) {
        console.log("SOUND (initSound) initialized")
        context = new AudioContext()
        sound_initialized = 1
    } else {
        console.log("SOUND (initSound) uninitialized")
        // AudioContext.close()
        sound_initialized = 0
    }}
//! ┌───────────────────────────────────────────────
//! │ Long sound  (note: update "var num_of_audios")
//! └───────────────────────────────────────────────
function playSound_0(v1, dv) {
    if (sound_initialized == 1) {
        var osc = context.createOscillator()
        var gain = context.createGain()

        osc.frequency.value = notes[v1] / dv; // A note
        osc.start(0);
        osc.connect(gain);
        gain.connect(context.destination);

        //tell is ti do what ist is souyopposed to do
        gain.gain.setValueAtTime(0.00001, context.currentTime); // <-- line of interest

        // UP/DN
        gain.gain.exponentialRampToValueAtTime(0.1 / (dv / 2), context.currentTime + (v1 * 2));
        gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + (v1 * 2 * 2));

        setTimeout(function () {
            osc.stop();
        }, v1 * 2 * 2 * 1000);
    }}
//! ┌───────────────────────────────────────────────
//! │ Short sound  (note: update "var num_of_audios")
//! └───────────────────────────────────────────────
function playSound_1(v1, dv) {
    if (sound_initialized == 1) {
        //console.log("PLAY SOUND",tree_counter)
        var osc = context.createOscillator()
        var gain = context.createGain()
        let x = Math.abs((parseInt(notes[v1] / dv) * 1000) / 1000)
        osc.frequency.value = x;// A note
        osc.start(0);
        osc.connect(gain);
        gain.connect(context.destination);

        //tell is ti do what ist is souyopposed to do
        gain.gain.setValueAtTime(0.00001, context.currentTime); // <-- line of interest

        let upt = 0.0 * dv
        let dnt = 1 * dv
        // UP/DN
        gain.gain.exponentialRampToValueAtTime(0.1 / (dv / 2), context.currentTime + upt);
        gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + dnt);

        setTimeout(function () {
            osc.stop();
        }, dnt * 1000);
    }}
//! ┌───────────────────────────────────────────────
//! │ manually added FFT data
//! └───────────────────────────────────────────────
function playSound_2() {
    if (sound_initialized == 1) {
        var real = new Float32Array(7);
        var imag = new Float32Array(7);
        var ac = new AudioContext();
        var osc = ac.createOscillator();

        real = [1, 0.618033989, 0.414213562, 0.302775638, 0.236067978, 0.192582404, 0.162277660];
        imag = [1, 0.618033989, 0.414213562, 0.302775638, 0.236067978, 0.192582404, 0.162277660];

        const wave = ac.createPeriodicWave(real, imag);

        osc.setPeriodicWave(wave);
        osc.connect(ac.destination);
        osc.start();
        osc.stop(1);
    }}
//! ┌───────────────────────────────────────────────
//! │ variable length  (note: update "var num_of_audios")
//! └───────────────────────────────────────────────
function playSound_1(v1, dv) {
    if (sound_initialized == 1) {
        var osc = context.createOscillator()
        var gain = context.createGain()
        let x = Math.abs((parseInt(notes[v1] / dv) * 1000) / 1000)
        // console.log(x)
        osc.frequency.value = x;// A note
        osc.start(0);
        osc.connect(gain);
        gain.connect(context.destination);

        //tell is ti do what ist is souyopposed to do
        gain.gain.setValueAtTime(0.00001, context.currentTime); // <-- line of interest

        let upt = 0.0 * dv
        let dnt = 1 * dv
        // UP/DN
        gain.gain.exponentialRampToValueAtTime(0.1 / (dv / 2), context.currentTime + upt);
        gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + dnt);

        setTimeout(function () {
            osc.stop();
        }, dnt * 1000);
    }}
//! ┌───────────────────────────────────────────────
//! │ halt the program for 1000 seconds
//! └─────────────────────────────────────────────── 
function freeze() {
    console.log("freezing ...")
    loop_delay = 1000000000
    timer.set_interval(loop_delay);}
//! ┌───────────────────────────────────────────────
//! │ plays an MP3 sound file using
//! └───────────────────────────────────────────────
var playSoundData = (function () {
    var df = document.createDocumentFragment();
    return function Sound(src) {
        var snd = new Audio(src);
        df.appendChild(snd); // keep in fragment until finished playing
        snd.addEventListener('ended', function () {
            df.removeChild(snd);
        });
        snd.volume = 1;
        snd.play();
        return snd;
    }}());
//! ┌───────────────────────────────────────────────
//! │ read query string and override existing default values
//! └───────────────────────────────────────────────
function qget(tag, val) {
    var r = false
    if (typeof refs[tag] !== 'undefined') {
        r = refs[tag]
    } else {
        r = val
    }
    console.log("OVERRIDING [" + tag + "] with [" + r + "]")
    return r}
//! ┌───────────────────────────────────────────────
//! │ Build SVG 'd' paths 
//! └───────────────────────────────────────────────
function buildpath(xfr) { 
    //? each xfry_* array has 63 elements
    //@ why is there 63 when there is supposed to be 31 each? 
    //@ Added {0,0} in idx 0 to make it 64


    var sqary_r = [ [],[],[],[],[],[] ]
    var lines_r = []
    var g,x,y
    //! load all data. 64 points total (1+2+4+8+16=31 * 2 = 64)
    //? push the 6 elemnts 
    var idxs = [6,5,4,3,2,1,0]
    //? assign sqary_r
    for (let k = 0; k<xfr.length; k++) {
        g = xfr[k]['g']
        alt_g = idxs[g]
        x = parseFloat(xfr[k]['x'])
        y = parseFloat(xfr[k]['y'])

        for (let i = 0; i<6; i++) {
            //? there is only 1 value in level 0, we fill in the 64 with v0 
            //? there are only 2 values in level 1, we fill in the first 32 with v0 and teh 2nd 32 with v2
            //? there are 4 values, in level 2, 8 vals in L3, 16 in l4 and 32 in L5
            for (let j = 0; j<xfr.length; j = j+(2**j)) {
                sqary_r[i].push({x,y})
            }
        }
    }
    //? not sur what I did, but the array is massive and needs to be cleaned up
    var fixed_ary = [ [],[],[],[],[],[] ]
    for (let k=0;k<6;k++) {
        for (let i=0;i<64;i++) {
            fixed_ary[k].push(sqary_r[k][i*4])
        }
    }
    sqary_r=fixed_ary

    //? join all 6*64 arrays together

    //? CUBIC CURVE v5 - TRUE CURVE - OPEN          #1 True Curve Open
    function makepath_CS1(q) {
//        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]
        let x = ""
        for (let k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M 0 0 "
            j=0
            for (let i=1; i<64;i+=1) {
                x = x + "S " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
                i= i+j
            }
            path[k]=x
        }
        return path
    }

    //? CUBIC CURVE v5 - TRUE CURVE - CLOSED        #2 True Curve Closed
    function makepath_CS2(q) {
//        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]
        let x = ""
        for (let k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M 0 0 "
            j=0
            for (let i=1; i<64;i+=1) {
                x = x + "S " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
                i= i+j
            }
            x = x + "S 0 0 0 0z";
            path[k]=x
        }
        return path
    }

    //? CUBIC CURVE v3                              #4 Complex Curve 2
    function makepath_CS3(q) {
//        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]

        let x = ""
        for (let k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (let i=1; i<28;i++) {
                x = x + "C " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                // i=i+j
                i=j
            }
            path[k]=x
        }
        return path
    }

    //? CUBIC CURVE v4                              #6 Complex Curve 3
    function makepath_CS4(q) {
        path_ary = []
        path=[0,0,0,0,0,0]
//        path_width=2  //? this is a very dense and busy path, so thinner lines

        let x = ""
        for (let k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]

            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (let i=1; i<26;i++) {
                x = x + "C " +s[i+j+j].x*q+","+s[i+j-j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                // i=i+j
                i=j
            }
            path[k]=x
        }
        return path
    }

    //? CUBIC CURVE - cmplex                        #2 Complex Curve 4
    function makepath_CS5(q) {
//        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]
        j=0
        for (let k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            let x = ""
            x = x + "M "+s[0].x*q+" "+s[0].y+" "
            x = x + "C "+s[1].x*q+" "+s[1].y+","
            for (let i=3; i<64-2;i++) {
                x = x + ""  +s[i].x*q+" "+s[i].y+","
            }
            x = x + "S "+s[63].x*q+" "+s[63].y+","
            x = x + " "  +s[63].x*q+" "+s[63].y+" "
            path[k]=x
        }    
        return path
    }

    //? CUBIC CURVE v5 - TRUE CURVE call combined- OPEN          #6 super complex
    function makepath_CS6(q) {
        var bigary = []
        for (let k=0;k<6;k++) {
            for (let i=0;i<64;i++) {
                bigary.push(sqary_r[k][i])
            }
        }
//        path_width = 1
//        path_ary = []
        path=[]

        let x = ""
        let s = bigary
        x = x + "M 0 0 "
        j=0
        for (let i=1; i<128;i+=1) {
            x = x + "S " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
            x = x + "  " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
//            i = i+j
        }
        for (let i=1; i<6;i+=1) {
            path.push(x)
        }
        return path
    }

{
    //? QUADRATIC CURVE = not very curvy
//    function makepath_QT(q) {
//        path_width=3
//        path_ary = []
//        path=[0,0,0,0,0,0]
//
//        let x = ""
//        for (let k=0;k< sqary_r.length;k++) {
//            let s = sqary_r[k]
//            x = x + "M "+s[0].x*q+","+s[1].y+" "
//            j=0
//            for (let i=1; i<51;i++) {
//                x = x + "Q " +s[i+j].x*q+","+s[i+j].y+" ";j++;
//                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
//                x = x + "T " +s[i+j].x*q+","+s[i+j].y+" ";j++;
//                i= i+j
//            }
//            path[k]=x
//        }
//        return path
//    }
    //? ARC PATHS - sorta useless
//    function makepath_LA(q) {
//        path_width=3
//        path_ary = []
//        path=[0,0,0,0,0,0]
//        for (let k=0;k< sqary_r.length;k++) {
//            let s = sqary_r[k]
//            let x = ""
//            x = x + "M "+s[0].x*q+","+s[1].y+" "
//            j=0
//            for (let i=1; i<51;i = i++) {
//                //A rx ry x-axis-rotation large-arc-flag sweep-flag x y
//                x = x + "L " +s[i+j].x*q+","+s[i+j].y+" ";j++
//                x = x + "A 60 60 0 0 0 " +s[i+j].x*q+","+s[i+j].y+" ";j++
//                x = x + "L " +s[i+j].x*q+","+s[i+j].y+" ";j++
//                x = x + "A 60 60 0 0 1 " +s[i+j].x*q+","+s[i+j].y+" ";j++
//                x = x + "L " +s[i+j].x*q+","+s[i+j].y+" ";j++
//                i = i+j
//            }
//            path[k]=x
//        }
//        return path
//    }
}

    updateObjMinMax(sqary_r);
    var rs = false;

    if (cycle_path == 1) { rs=[makepath_CS1(1),makepath_CS1(-1)]}  //? true curve open
    if (cycle_path == 2) { rs=[makepath_CS2(1),makepath_CS2(-1)]}  //? true curve closed
//    if (cycle_path == 3) { rs=[makepath_CS3(1),makepath_CS3(-1)]}  //? complex l.1
    if (cycle_path == 3) { rs=[makepath_CS3(1),makepath_CS3(-1)]}  //? complex l.2
    if (cycle_path == 4) { rs=[makepath_CS4(1),makepath_CS4(-1)]}  //? complex l.3
    if (cycle_path == 5) { rs=[makepath_CS5(1),makepath_CS5(-1)]}  //? complex l.4
    if (cycle_path == 6) { rs=[makepath_CS6(1),makepath_CS6(-1)]}  //? super complex

    return rs}




