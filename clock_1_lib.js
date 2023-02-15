
//! ┌───────────────────────────────────────────────
//! │ holds the x,y data
//! └───────────────────────────────────────────────
class Node {
    constructor(a, b) {
        this.x = a;
        this.y = b;
    }
    toString() {
        return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
    }
}
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
    }
}
// >> test
//! ┌───────────────────────────────────────────────
//! │ The main class that create the x/y coords then calls drawTree
//! └───────────────────────────────────────────────
class Tree {
    constructor(gens, lineLength, x, y, angle, rotation) {
        branch_counter++
        //@ **************************************************
        //@            let _a = angle
        //@            let _r = rotation
        //@              
        //@            rotation = _a
        //@            angle = _r
        //@ **************************************************
        //? all trees have a base node

        this.base_node = new Node(x, y);
        var srange = normalize([-540, mloc.y, 540], [0, 6]);
        var genApply = Math.ceil(srange[1]);
        var rel_len = false
        var realgen = (7 - gens) - 1

        var newangleLEFT
        var newangleRIGHT

        newangleLEFT = ((angle * genangLEFT[realgen]) % 360) + rotation
        newangleRIGHT = ((angle * genangRIGHT[realgen]) % 360) - rotation

        maxlengths = [0, 0, 0, 0, 0, 0]  //reset
        for (let i = 0; i < pre_maxlengths.length; i++) {
            maxlengths[i] = pre_maxlengths[i] + mladj[i]
        }

        //% █████████████ ADJUSTMENTS █████████████
        let newlinelength = maxlengths[realgen] * linelength_adj
        //% newlinelength = newlinelength + (cycle_in_range(parseInt(tree_counter/gens), -500,500, 0)/10) 

        if (gens > 0) {

            //% █████████████ ADJUSTMENTS █████████████
            //% cumxy[gens][0] = Math.round(cumxy[gens][0] + x)%100/100;
            //% cumxy[gens][1] = Math.round(cumxy[gens][1] + y)%100/100;
            //% if (gens == 6) {
            //%   console.log(cumxy[5][0],cumxy[5][1])
            //% }

            //? determine next node to the RIGHT in the tree with trig -->


            this.right_node = new Node(
                    x + (newlinelength) * Math.cos(toRadians(newangleRIGHT)),
                    y + (newlinelength) * Math.sin(toRadians(newangleRIGHT))
                    );

            fullary_right.push({'x':x,'y':y})
            //@ DEBUG
            xfullary_right.push({
                'g':gens,
                'x':(x + (newlinelength) * Math.cos(toRadians(newangleRIGHT))).toFixed(2),//Math.round(x*100)/100,
                'y':(y + (newlinelength) * Math.sin(toRadians(newangleRIGHT))).toFixed(2)//Math.round(y*100)/100
            })


            //? determine next node to the LEFT in the tree with trig 
            this.left_node = new Node(
                    x + (newlinelength) * Math.cos(toRadians(newangleLEFT)),
                    y + (newlinelength) * Math.sin(toRadians(newangleLEFT))
                    );

            // fullary_left.push({'x':x,'y':y})
            // //@ DEBUG
            // xfullary_left.push({
            //     'g':gens,
            //     'x':x + (newlinelength) * Math.cos(toRadians(newangleLEFT)),// Math.round(x*100)/100,
            //     'y':y +   Math.round(y*100)/100
            // })

            //<!--  create edges in the graph that connect the base node to the following nodes -->
            this.right_branch = new Edge(this.base_node, this.right_node);
            this.left_branch = new Edge(this.base_node, this.left_node);

            //<!--  generate a tree beginning at the left node, with a lower depth and new start angle -->
            this.left_tree = new Tree(
                    gens - 1,
                    maxlengths[realgen],
                    this.left_node.x,
                    this.left_node.y,
                    newangleLEFT,
                    rotation
                    );

//                        var rrange = normalize([-540, mloc.y, 540],[-180,180]);
//                        var rotApply = Math.ceil(rrange[1]);

            //<!--  generate a tree beginning at the right node, with a lower depth and new start angle -->               

            this.right_tree = new Tree(
                    gens - 1,
                    maxlengths[realgen],
                    this.right_node.x,
                    this.right_node.y,
                    newangleRIGHT,
                    rotation
                    );
        }
    }
}


function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

//! ┌───────────────────────────────────────────────
//! │ recursive collection of nodes and edges that form a tree
//! └───────────────────────────────────────────────

function drawTree(branch_angle, rotation) {
    //console.log(branch_angle, rotation)
    tree_counter++;


    //FIXME: for SOME reason, these vals need to be flipped to work :/
    let _a = branch_angle
    let _r = rotation
    rotation = _a
    branch_angle = _r

    clearCanvas()

    //? rebuild timing data based on changes in specs
    tt = cycletimes(loop_delay, deg_adj, genangLEFT, genangRIGHT)
    cycletime = tt['cycletime']
    tot_cycletime = tt['tot_cycletime']
    tot_images = tt['tot_images']

    if (rnd_colors == 2) {
        for (let i = 0; i < 7; i++) {
            colors2[0][i] = generateRandomColor()
        }
    }
    if (rnd_colors == 1) {
        for (let i = 0; i < 7; i++) {
            colors2[0][i] = generateColor(cycle_in_range(tree_counter + (i * 45), 0, 360, 0))
        }
    }

    //% █████████████ ADJUSTMENTS █████████████
    //% let noteseed = (54+tree_counter+ rotation)%108+108


    rnum=0;
    writ('    [HOME]  Toggle BG Color (B/W)',   '');
    writ('(c) [UP]    ++Faster',                '(' + loop_delay / 1000 + 's)');
    writ('    [DN]    --Slower',                '(' + loop_delay / 1000 + 's)');
    writ('    [PGUP]  ++Longer',                '(' + linelength_adj + ')');
    writ('    [PGDN]  --Shorter',               '(' + linelength_adj + ')');
    writ('    [RIGHT] ++Fatter',                '');
    writ('    [LEFT]  --Thinner',               '');
    writ('(i) [INS]   ++Deg*2',                 '(' + deg_adj % 360 + ')');
    writ('    [DEL]   --Deg/2',                 '(' + deg_adj % 360 + ')');
    writ('',                                    '');
    writ('(l) [ALT-N]      ++Circles Radius',   '(' + circle_radius + ')');
    writ('    [ALT-B]      --Circles Radius',   '(' + circle_radius + ')');
    writ('(p) [ALT-X]      ++Circles Opacity',  '(' + circle_opacity + ')');
    writ('    [ALT-Z]      --Circles Opacity',  '(' + circle_opacity + ')');
    
    writ('(k) [ALT-R]      Cycle colors',       '');
    writ('(g) [ALT-G]      Cycle audio',        '(' + cycle_audio + ')');
    
    writ('(a) [ALT-K]      Cycle Connectors',   '(' + current_path + ')');
    writ('(n) [ALT-V]      Cycle Polygons',     '(' + which_poly + ')');
    writ('    [ALT-O]      ++poly opacity',     '(' + poly_opacity + ')');
    writ('(o) [ALT-I]      --poly opacity',     '(' + poly_opacity + ')');
    writ('    [ALT-J]      Jump fwd 5 deg',     '');
    writ('    [CTRL-Y]     Toggle audio',       '(' + sound_initialized + ')');
    writ('','');
    writ('(a1-a6) [ALT-CTRL 1-6]    Toggle Hide lvl 1-6',   '(' + show_0 + show_1 + show_2 + show_3 + show_4 + show_5 + ')');
    writ('(q)     [ALT-CTRL 0]      Toggle All Lines',      '(' + show_all + ')');
    writ('        [CTRL-SFT-(F1-F6) Longer Lines 1-6','');
    writ('        [CTRL-SFT-(1-6)   Shorter Lines 1-6','');
    writ('-------------------------------------------------','');
    writ('[CTRL=SFT-Z]   Show/Hide this menu',  '');
    writ('[SPACE] Pause/Run',                   '');
    writ('TIME PER CYCLE:',                     cycletime);
    writ('Current Angle:',                      rotation % 360);

    function makeQs(qs) {
        // let qs = "https://tholonia.com/Images/SVG/notclock.svg"
        // let qs = "file:///home/jw/store/src/music/clock_1.svg"
        qs = qs + "?c=" + loop_delay
        qs = qs + "&i=" + deg_adj
        qs = qs + "&l=" + circle_radius
        qs = qs + "&k=" + rnd_colors
        if (show_all == 0) {
            qs = qs + "&q=" + show_all;
        } else {
            qs = qs + "&q=" + show_all
            qs = qs + "&a1=" + show_0
            qs = qs + "&a2=" + show_1
            qs = qs + "&a3=" + show_2
            qs = qs + "&a4=" + show_3
            qs = qs + "&a5=" + show_4
            qs = qs + "&a6=" + show_5
        }
        qs = qs + "&n=" + which_poly
        qs = qs + "&o=" + poly_opacity
        qs = qs + "&g=" + cycle_audio
        qs = qs + "&p=" + circle_opacity
        qs = qs + "&a=" + current_path
        return(qs)

    }
    writ('QUERY STR: ', makeQs("https://tholonia.com/Images/SVG/notclock.svg"));
    if (_PRIVATE_MODE) {
        writ('QUERY STR: ', makeQs("file:///home/jw/store/src/music/clock_1.svg"));
    }
    writ('v.'+_VERSION,                          '');

    //wTextLeft({'str':'TIME PER REPEAT: '+tot_cycletime          ,'row':rnum, 'col':0});;rnum++;
    //wTextLeft({'str':'TOTAL UNIQUE FORMS: '+tot_images.toLocaleString("en-US")          ,'row':rnum, 'col':0});;rnum++;                

    if (sound_initialized == 1) {
        alternotes = [54, 67.5, 43.2, 34.56, 84.375]
        let noteseed = (tree_counter + rotation) % 4
        let rx = randint(0, alternotes.length - 1)
        let xx = alternotes[rx] * 2
    }

    var draw_tree = new Tree(gens, this_length, start_x, start_y, branch_angle, rotation);

    var draw_edges = getTreeEdges(draw_tree);
    var svg = document.getElementById("svg");

    gen = 0
 

    //@ ████████████████████████████████████████████████
    //? create data sets from original data

    // var bezierary_right = BezierCurve(fullary_right);
    // var bezierary_left = BezierCurve(fullary_left);

    adata_right = []
    adata_left = []

    if (current_path == 0) {dataform ="line"}
    if (current_path >0 ) {dataform ="buildpath"}

    //? this is always on as the default, can be turned off by hiding lines function
    draw_edges.forEach(element => {
        adata_right.push({'x':element.node_1.x, 'y':element.node_1.y})
        adata_left.push({'x':element.node_2.x, 'y':element.node_2.y})
    })
    //? these are ugly and broken
    // if (dataform == "bez") {
    //     adata_right = BezierCurve(fullary_right);
    //     adata_left = BezierCurve(fullary_left);
    // }
    // if (dataform == "bezSrtx") {
    //     adata_right = BezierCurve(fullary_right);
    //     adata_left = BezierCurve(fullary_left);
    //     adata_right = sortByKey(adata_right,'x');
    //     adata_left = sortByKey(adata_left,'y');
    // }


    //@ ████████████████████████████████████████████████

    if (dataform=="buildpath") {
        //? build the paths
        //@ DEBUG need trigger to turn on/off paths
        paths = buildpath(xfullary_right)
        path_r = paths[0]
        path_l = paths[1]

        //? reset arrays to initial item only
        xfullary_right = [{'g':7,'x':0,'y':0}]
        xfullary_left = [{'g':7,'x':0,'y':0}]


        var newPath_r = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        var newPath_l = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        //@ DEBUG Doesn't exactlyy do what I want
        let limiter = Math.round(1 / (Math.abs((loop_delay / 1000))))
        // path_width = cycle_in_range(tree_counter, 2,10)
        // if (tree_counter % limiter == 0) {
        //     log(tree_counter)
        //     log(tree_counter%20)
        //     log(path_width)
        // }

        //? prepare the gradiant stroke
        var svgns = 'http://www.w3.org/2000/svg';
        var defs = document.createElementNS(svgns, 'defs');
        var gradient = document.createElementNS(svgns, 'radialGradient');

        var stops = [
            {
                "color": "white",
                "offset": "0%"
            },
            {
                "color": "#000000",
                "offset": "100%"
            }
        ];

        for (var i = 0, length = stops.length; i < length; i++) {
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', stops[i].offset);
            stop.setAttribute('stop-color', stops[i].color);
            gradient.appendChild(stop);
        }
        gradient.id = 'Gradient';
        gradient.setAttribute('cx', '0.5');
        gradient.setAttribute('cy', '0.3');  //? light is slightly above horizon
        gradient.setAttribute('r', '1');
        defs.appendChild(gradient);
        newPath_l.setAttribute('fill', 'url(#Gradient)');
        newPath_r.setAttribute('fill', 'url(#Gradient)');

        newPath_r.setAttribute('d', ""+path_r[gen]);
        newPath_r.setAttribute("fill-opacity", "0");
        newPath_r.setAttribute("stroke-width", path_width);
        newPath_r.setAttribute('stroke', 'url(#Gradient)');
        svg.appendChild(defs);
        svg.appendChild(newPath_r);

        newPath_l.setAttribute('d', ""+path_l[gen]);
        newPath_l.setAttribute("fill-opacity", "0");
        newPath_l.setAttribute("stroke-width", path_width);
        newPath_l.setAttribute('stroke', 'url(#Gradient)');
        svg.appendChild(defs);
        svg.appendChild(newPath_l);
    }

    for (let idx = 0; idx<adata_right.length; idx++) {
        nx1 = adata_right[idx].x
        ny1 = adata_right[idx].y
        nx2 = adata_left[idx].x
        ny2 = adata_left[idx].y

        var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLine.setAttribute('x1', nx1.toString());
        newLine.setAttribute('y1', ny1.toString());
        newLine.setAttribute('x2', nx2.toString());
        newLine.setAttribute('y2', ny2.toString());

        let order = lOrder[gen] //? get the actual gen value from the gensm, which goes uo to 125

        //? add circle
        var totcirc = 3
   
        //% █████████████ ADJUSTMENTS █████████████
        var cr_rad = circle_radius*((7-order))

        //? report mouse x/y position on teh screen
        wText({'str':"x="+point.x+",y="+point.y, 'row':2,'col':3})

        if (circle_radius > 0) { //? we have a circle
            //? cyces through the total number of circles patterns available, i.e., 0,1,2...
            //? Need to use cycles_radius and not cr_rad otherwise it breaks the continuity of the MOD cycle
            if ((circle_radius + 1) % totcirc == 0) { 

                //? prepare teh gradian for the circle
                //@ DEBUG prob better to move defs into the global scope
                var svgns = 'http://www.w3.org/2000/svg';
                var defs = document.createElementNS(svgns, 'defs');
                var gradient = document.createElementNS(svgns, 'radialGradient');
                var circle = document.createElementNS(svgns, 'circle');

                var stops = [
                    {
                        //        "color":  colors2[0][order].toString(),
                        "color": "white",
                        "offset": "0%"
                    },
                    {
                        "color": "#000000",
                        "offset": "100%"
                    }
                ];

                for (var i = 0, length = stops.length; i < length; i++) {
                    var stop = document.createElementNS(svgns, 'stop');
                    stop.setAttribute('offset', stops[i].offset);
                    stop.setAttribute('stop-color', stops[i].color);
                    gradient.appendChild(stop);
                }

                gradient.id = 'Gradient';
                gradient.setAttribute('cx', '0.3');
                gradient.setAttribute('cy', '0.3');
                gradient.setAttribute('r', '1');
                defs.appendChild(gradient);
                circle.setAttribute('fill', 'url(#Gradient)');


                circle.setAttribute("id", "circles");
                circle.setAttribute("cx", nx2.toString());
                circle.setAttribute("cy", ny2.toString());
                circle.setAttribute("r", cr_rad);
                circle.setAttribute("opacity", circle_opacity);

                svg.appendChild(defs);
                svg.appendChild(circle);
            }


            if ((circle_radius + 1) % totcirc == 1) {
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                circle.setAttribute("id", "circles");
                circle.setAttribute("cx", nx2.toString());
                circle.setAttribute("cy", ny2.toString());
                circle.setAttribute("r", cr_rad);
                circle.setAttribute("fill", colors2[0][order].toString());
                circle.setAttribute("stroke", "darkgrey");
                circle.setAttribute("opacity", circle_opacity);
                circle.setAttribute("stroke-width", '1');
                circle.setAttribute("stroke-linecap", "round");
                //circle.setAttribute("fill", generateRandomColor());
                //circle.setAttribute("stroke", generateRandomColor());

                svg.appendChild(circle);
            }
            if ((circle_radius + 1) % totcirc == 2) {
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

                circle.setAttribute("id", "circles");
                circle.setAttribute("cx", nx2.toString());
                circle.setAttribute("cy", ny2.toString());
                circle.setAttribute("r", cr_rad);
                circle.setAttribute("stroke", "darkgrey");
                circle.setAttribute("opacity", circle_opacity);
                circle.setAttribute("stroke-width", '1');
                circle.setAttribute("stroke-linecap", "round");
                circle.setAttribute("fill", generateRandomColor());
                //circle.setAttribute("fill", colors2[0][order].toString());
                //circle.setAttribute("stroke", generateRandomColor());

                svg.appendChild(circle);
            }
        }





        var poly_arr = false

        if (which_poly == 1) {
            // console.log("Usng polugon 1")

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
        }
        if (which_poly == 2) {
            // console.log("Usng polugon 2")
            poly_arr =
                    [
                        [nx2, ny2],
                        [
                            (nx2 * Math.cos(rotation)) - (nx2 * Math.sin(rotation)),
                            (ny2 * Math.cos(rotation)) + (ny2 * Math.sin(rotation)),
                        ],
                        [
                            (nx2 * Math.cos(rotation)) - (nx2 * Math.sin(rotation)),
                            (ny2 * Math.cos(rotation)) + (ny2 * Math.sin(rotation)),
                        ],
                    ];
        }
        if (which_poly == 3) {
            // console.log("Usng polugon 3")
            poly_arr =
                    [
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
        }
        if (which_poly == 4) {
            // console.log("Usng polugon 4")
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

        if (which_poly > 0) {
            let poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute("points", poly_arr);
            poly.setAttribute("fill", colors2[0][order + gens].toString());
            poly.setAttribute("stroke", "black");
            poly.setAttribute("opacity", poly_opacity);
            //poly.setAttribute("fill", generateRandomColor());
            //poly.setAttribute("stroke", generateRandomColor());
            poly.setAttribute("stroke-width", '1');
            poly.setAttribute("stroke-linecap", "round");
            svg.appendChild(poly);
        }

        //% █████████████ ADJUSTMENTS █████████████
        newpensize = pensize[order] * line_thickness
        //% newpensize = cycle_in_range((tree_counter-order)/10*(order+1),1,10,0)

        //? DRAW THE LINE
        newLine.setAttribute("stroke-width", newpensize);
        this_color = colors2[0][order]
        newLine.setAttribute("stroke", this_color);
        this_opacity = opacities[order]
        newLine.setAttribute("opacity", this_opacity);




        // what line sto show/hide
        if (show_all == 1) {
            if (show_0 == 1 && order == 0) {
                svg.appendChild(newLine);
            }
            if (show_1 == 1 && order == 1) {
                svg.appendChild(newLine);
            }
            if (show_2 == 1 && order == 2) {
                svg.appendChild(newLine);
            }
            if (show_3 == 1 && order == 3) {
                svg.appendChild(newLine);
            }
            if (show_4 == 1 && order == 4) {
                svg.appendChild(newLine);
            }
            if (show_5 == 1 && order == 5) {
                svg.appendChild(newLine);
            }
        }
        gen++;
    };

    if (sound_initialized == 1) {
        
        //@ g=0: playSound_0()  Long sound
        //@ g=1: playSound_1()  Short sound
        //@ g=2: playSoundData()  snd.play(MP3) - currenly not used
        //@ g=3: playSound_2()  long and short together
        //@ g=4: playSound_3()  varible length

        //@ var num_of_audios = 5
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
        //             //? roration is actually angle :/  so angle%36= rangoe of 1-10 seconds
        //             playSound_3(crosssum(rotation)%36, i)
        //         }, pp * i)
        //     }
        // }
    }
}
//! ┌───────────────────────────────────────────────
//! │ Convert HSV to RGB
//! └───────────────────────────────────────────────
function HSVtoRGB(h, s, v) {
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
    return "#" + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16)
    //    { 
    //        r: Math.round(r * 255).toString(16),
    //        g: Math.round(g * 255).toString(16),
    //        b: Math.round(b * 255).toString(16)
    //    };
}
//! ┌───────────────────────────────────────────────
//! │ Creates RGN string from a number
//! └───────────────────────────────────────────────
function generateColor(num) {
    var H = num / 360 //? H range is 0-360, 0 and 360 are both RED
    //@ probably better to MOD the H, not divide
    var S = .8
    var V = .8
    return HSVtoRGB(H, S, V)
}
//! ┌───────────────────────────────────────────────
//! │Randmo color between #000000 and #FFFFFF
//! └───────────────────────────────────────────────
function generateRandomColor() {
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);
    return `#${randColor.toUpperCase()}`
}
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
function cycle_in_range(number, amin, amax, invert = 0) {
    try {
        mod_num = number % amax
    } catch {
        mod_num = 0
    }

    try {
        mod_num2 = number % (amax * 2)
    } catch {
        mod_num2 = 0
    }

    new_val1 = Math.abs(mod_num2 - (mod_num * 2))

    old_min = 0
    old_min = 0
    old_max = amax
    new_max = amax
    new_min = amin

    try {
        new_value = ((new_val1 - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min
    } catch {
        new_value = 0
    }
    if (invert == 1) {
        new_value = amax - new_value
    }
    return (Math.round(new_value))
}
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
    }
}
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
    }
}

function jstr(obj) {
    console.log(JSON.stringify(obj),null,2)
}
function log(txt) {
    console.log(txt)
}

//! ┌───────────────────────────────────────────────
//! │ Create Bezier curve form a list of values
//! └───────────────────────────────────────────────
function BezierCurve(points) {
    //? expect data for be array of associative arrays of x/y values
    //? [{"x":-64.25896664854749,"y":12.508200260460674},{"x":-89.73634559153838,"y":4.5384851983379075},{"x":-38.78158770555659,"y":20.477915322583442},{"x":-56.28925158642472,"y":37.98557920345157},{"x":-72.22868171067026,"y":-12.969178682530222}]

    let n = points.length;
    // console.log("points",n,)
    // jstr(ponts)
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
    return curvepoints;
}
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
    return(rval)
}
//! ┌───────────────────────────────────────────────
//! │                                              
//! └───────────────────────────────────────────────
function next() {
    return
}
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
    return newSet.map(n => n * newRange + initial);
};
//! ┌───────────────────────────────────────────────
//! │ Get point in global SVG space
//! └───────────────────────────────────────────────
function cursorPoint(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
}
//! ┌───────────────────────────────────────────────
//! │ Javascript math library trig functions take radians and not degrees by default 
//! └───────────────────────────────────────────────
function toRadians(angle) {
    return angle * Math.PI / 180;
}
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
    }
}
//! ┌───────────────────────────────────────────────
//! │ Remove all children on the SVG canvas                                             
//! └───────────────────────────────────────────────
function clearCanvas() {
    const myNode = document.getElementById("svg");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}
//! ┌───────────────────────────────────────────────
//! │ ??? reverse engineer the generation level based on the points generated
//! └───────────────────────────────────────────────
function getLevel(p) {
    for (n = 12; n >= 0; n--) {
        if (p >= 2 ** n) {
            return (n)
        }
    }
    return (0)
}
//! ┌───────────────────────────────────────────────
//! │ write text to screen as row/col location
//! └───────────────────────────────────────────────
function writeText(args) {
    //? args is array of keys/values
    var svg = document.getElementById("svg");
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.id = args['idname'];

    text.setAttribute("x", args['x']);
    text.setAttribute("y", args['y']);
    text.setAttribute("style", args['style']);
    text.setAttribute("fill", args['fill']);
    text.setAttribute("font-size", args['font-size']);
    text.setAttribute("font-family", args['font-family']);
    text.setAttribute("stroke", args['stroke']);

    let textNode = document.createTextNode(args['text']);
    text.appendChild(textNode);
    svg.appendChild(text);

    return (document.getElementById(args['idname']));
}
//! ┌───────────────────────────────────────────────
//! │ write text to screen as row/col location
//! │ same as 'writeText', btu with default values already applied
//! └───────────────────────────────────────────────
function wText(args) {
    //? only needs 'x', 'y', 'str' keys
    if (showtext == true) {
        xpos = (args['col'] * 400) - 800
        ypos = (args['row'] * 30) + 300
        var svg = document.getElementById("svg");
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.id = "id-wtP1";
        text.setAttribute("style", "");
        text.setAttribute("classname", "wt", );
        text.setAttribute("x", xpos);
        text.setAttribute("y", ypos);
        text.setAttribute("fill", "grey");
        text.setAttribute("font-size", "20px");
        text.setAttribute("font-family", "Arial, Helvetica, sans-serif");
        text.setAttribute("font-weight", "600");
        //text.setAttribute("style", args['style']);
        //text.setAttribute("stroke", args['stroke']);

        let textNode = document.createTextNode(args['str']);
        text.appendChild(textNode);
        svg.appendChild(text);

        return (document.getElementById('id-wtP1'));
    }
}
//! ┌───────────────────────────────────────────────
//! │ convenience function for wTextLeft()
//! └───────────────────────────────────────────────
function writ(s1,s2) {
    wTextLeft({'str': s1 +" "+s2, 'row': rnum, 'col': 0});rnum++;
}
//! ┌───────────────────────────────────────────────
//! │ write text to left side of screen
//! └───────────────────────────────────────────────
function wTextLeft(args) {
    if (showtext == true) {
        xpos = (args['col'] * 400) - 800
        ypos = (args['row'] * 27) - 450
        var svg = document.getElementById("svg");
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.id = "id-wtP1";
        text.setAttribute("style", "white-space: pre;")
        text.setAttribute("classname", "wt", );
        text.setAttribute("x", xpos);
        text.setAttribute("y", ypos);
        text.setAttribute("fill", "grey");
        text.setAttribute("font-size", "18px");
        text.setAttribute("font-family", "monospace, monospace");
        text.setAttribute("font-weight", "600");
        //text.setAttribute("stroke", args['stroke']);
        //text.setAttribute("style", args['style']);
        //text.setAttribute("font-family", "Arial, Helvetica, sans-serif");

        let textNode = document.createTextNode(args['str']);
        text.appendChild(textNode);
        svg.appendChild(text);

        return (document.getElementById('id-wtP1'));
    }
}
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
    return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
}
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
    }
}
//! ┌───────────────────────────────────────────────
//! │ return random integer
//! └───────────────────────────────────────────────
function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//! ┌───────────────────────────────────────────────
//! │ converts degrees to radians
//! └───────────────────────────────────────────────
function deg2rad(degrees) {
    let pi = Math.PI;
    return degrees / (180 / pi);
}
//! ┌───────────────────────────────────────────────
//! │ converts radians to degrees
//! └───────────────────────────────────────────────
function rad2deg(radians) {
    let pi = Math.PI;
    return radians * (180 / pi);
}
//! ┌───────────────────────────────────────────────
//! │ returns epoch in seconds
//! └───────────────────────────────────────────────
function nowsecs() {
    function seconds_since_epoch(d) {
        return Math.floor(d / 1000);
    }
    //<!-- 144000 is seconds from midmioght to 4AM -->
    var d = Date.now();
    var secs = seconds_since_epoch(d);
    return secs
}
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
    }
}
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
    }
};
//! ┌───────────────────────────────────────────────
//! │ array of frequencies based on a single freuency
//! └───────────────────────────────────────────────
function getNotes(basenote) {
    var nFreq = []
    for (let n = -6; n < 6; n++) {
        nFreq.push(basenote * 2 ** (n / 12))
    }
    return nFreq
}
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
    return nFreq
}
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
    }
}
//! ┌───────────────────────────────────────────────
//! │ Long sound  (note: update "var num_of_audios")
//! └───────────────────────────────────────────────
function playSound_0(v1, dv) {
    if (sound_initialized == 1) {
        //console.log("PLAY SOUND",tree_counter)
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
            //console.log("killed oscillator")
        }, v1 * 2 * 2 * 1000);
    }
}
//! ┌───────────────────────────────────────────────
//! │ Short sound  (note: update "var num_of_audios")
//! └───────────────────────────────────────────────
function playSound_1(v1, dv) {
    if (sound_initialized == 1) {
        //console.log("PLAY SOUND",tree_counter)
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
            //console.log("killed oscillator")
        }, dnt * 1000);
    }
}
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
    }
}
//! ┌───────────────────────────────────────────────
//! │ variable length  (note: update "var num_of_audios")
//! └───────────────────────────────────────────────
function playSound_1(v1, dv) {
    if (sound_initialized == 1) {
        //console.log("PLAY SOUND",tree_counter)
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
            //console.log("killed oscillator")
        }, dnt * 1000);
    }
}

//! ┌───────────────────────────────────────────────
//! │ halt the program for 1000 seconds
//! └─────────────────────────────────────────────── 
function freeze() {
    console.log("freezing ...")
    loop_delay = 1000000000
    timer.set_interval(loop_delay);
}
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
    }
}());
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
    return r
}

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
    for (k = 0; k<xfr.length; k++) {
        g = xfr[k]['g']
        alt_g = idxs[g]
        x = parseFloat(xfr[k]['x'])
        y = parseFloat(xfr[k]['y'])

        for (i = 0; i<6; i++) {
            //? there is only 1 value in level 0, we fill in the 64 with v0 
            //? there are only 2 values in level 1, we fill in the first 32 with v0 and teh 2nd 32 with v2
            //? there are 4 values, in level 2, 8 vals in L3, 16 in l4 and 32 in L5
            for (j = 0; j<xfr.length; j = j+(2**j)) {
                sqary_r[i].push({x,y})
            }
        }
    }
    //? CUBIC CURVE - not curvy at all
    function makepath_CS(q) {
        path_ary = []
        path=[0,0,0,0,0,0]
        j=0
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            let x = ""
            x = x + "M "+s[0].x*q+" "+s[0].y+" "
            x = x + "C "+s[1].x*q+" "+s[1].y+","
            for (i=3; i<64-2;i++) {
                x = x + ""  +s[i].x*q+" "+s[i].y+","
            }
            x = x + "S "+s[64].x*q+" "+s[64].y+","
            x = x + ""  +s[64].x*q+" "+s[64].y+" "
            path[k]=x
        }    
        return path
    }

    //? QUADRATIC CURVE = not very curvy
    function makepath_QT(q) {
        path_ary = []
        path=[0,0,0,0,0,0]

        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M "+s[0].x*q+","+s[1].y+" "
            j=0
            for (i=1; i<64;i++) {
                x = x + "Q " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "T " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                i= i+j
            }
            path[k]=x
        }    
        return path
    }

    //? ARC PATHS - sorta useless
    function makepath_LA(q) {
        path_ary = []
        path=[0,0,0,0,0,0]
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            let x = ""
            x = x + "M "+s[0].x*q+","+s[1].y+" "
            j=0
            for (i=1; i<64;i = i++) {
                //A rx ry x-axis-rotation large-arc-flag sweep-flag x y
                x = x + "L " +s[i+j].x*q+","+s[i+j].y+" ";j++
                x = x + "A 90 90 0 0 0 " +s[i+j].x*q+","+s[i+j].y+" ";j++
                x = x + "L " +s[i+j].x*q+","+s[i+j].y+" ";j++
                x = x + "A 90 90 0 0 1 " +s[i+j].x*q+","+s[i+j].y+" ";j++
                x = x + "L " +s[i+j].x*q+","+s[i+j].y+" ";j++
                i = i+j
            }
            path[k]=x
        }    
        jstr(path)
        return path
    }
    //? CUBIC CURVE v2 - mosty curvy
    function makepath_CS2(q) {
        path_ary = []
        path=[0,0,0,0,0,0]

        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (i=1; i<64;i++) {
                x = x + "C " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "S " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                x = x + "  " +s[i+j].x*q+","+s[i+j].y+" ";j++;
                i= i+j
            }
            path[k]=x
        }    
        return path
    }
    //? CUBIC CURVE v3
    function makepath_CS3(q) {
        path_ary = []
        path=[0,0,0,0,0,0]

        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (i=1; i<64;i++) {
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
 
    //? CUBIC CURVE v4
    function makepath_CS4(q) {
        path_ary = []
        path=[0,0,0,0,0,0]
        path_width=1

        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (i=1; i<64;i++) {
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
 

    if (current_path == 1) {
        path_r = makepath_CS2(1); path_l = makepath_CS2(-1); //? works
    }
    if (current_path == 2) {
        path_r = makepath_CS(1); path_l = makepath_CS(-1);  //? works
    }
    if (current_path == 3) {
        path_r = makepath_QT(1); path_l = makepath_QT(-1);  //? works
    }
    if (current_path == 4) {
        path_r = makepath_LA(1); path_l = makepath_LA(-1);  //? works
    }
    if (current_path == 5) {
        path_r = makepath_CS3(1); path_l = makepath_CS3(-1);  //? works
    }
    if (current_path == 6) {
        path_r = makepath_CS4(1); path_l = makepath_CS4(-1);  //? works
    }

    return [path_r, path_l]        
}
