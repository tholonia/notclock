
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
//! │ The main class that creates the x/y coords then calls drawTree
//! └───────────────────────────────────────────────
class Tree {
    constructor(gens, lineLength, x, y, angle, rotation) {
        branch_counter++
        //? applying this here creates mangled trees
        //@ **************************************************
        //@            let _a = angle
        //@            let _r = rotation
        //@              
        //@            rotation = _a
        //@            angle = _r
        //@ **************************************************
        //? all trees have a base node
        // call_log("Tree")
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

            //? push all the x.y values to a simple array
            fullary_right.push({'x':x,'y':y})

            //? push all the ADJUTSED x/y values WITH their generations number to a simple array
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


//! ┌───────────────────────────────────────────────
//! │ sort associative array by key
//! └───────────────────────────────────────────────
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

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
    return query;
}

function writGrid(args) {

    let mCols = menuCols
    let fclrs = ['grey','yellow','white','green','white'] 
    let fwght = ['300','600','500','400','300'] 


    for (let i=0;i<args.length; i++) {
        if (args[0] != '✅') {       //? if first arg is '✅', use overrides
            menu_fontclr = fclrs[i]
            menu_fontweight=fwght[i]
        } else {
            mCols = menuAltCols
        }
        wTL({'str': args[i], 'row': rnum, 'col': mCols[i],});
        // console.log("mCols:",mCols[i],i)
    }
    // rnum++;
}
function wTL(args) {
    // row,col
    let fs = menu_fontsize
    let spacing = menu_spacing

    // if (showtext == true) {
        xpos = (args['col'] * 1) - 800
        // log("xpos:"+xpos+' - '+args['col'])
        ypos = (args['row'] * 20) - 450
        var svg = document.getElementById("svg");
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
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

        return (document.getElementById('id-wtP1'));
    // }
}
function writeMenu() {
    menu_fontweight="600";menu_fontclr="#00ffff"
    writGrid(['✅',_,_,_,'⌥ = Alt']);
    menu_fontweight="600";menu_fontclr="#00ff00"
    writGrid(['✅',_,_,'⇧ = Shift']);
    menu_fontweight="600";menu_fontclr="#ff00ff"
    writGrid(['✅',_,'^ = Ctrl'])
    menu_fontweight="600";menu_fontclr="red"
    writGrid(['✅','NOTE:']);rnum++;
    //? the above are all written on teh same line, but separated to gove different colors
    // writGrid(['✅']);rnum++;
    // writGrid(['✅','NOTE: ^ = Ctrl, ⇧ = Shift, ⌥ = Alt']);rnum++;
    writGrid(['°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°']);rnum++;
    menu_fontweight="300"
    writGrid([_,'HOME','Toggle BG (B/W)']);rnum++;
    writGrid(['up','▲ ▼','+fast|-slow','(' + loop_delay / 1000 + 's)']);rnum++;
    writGrid([_,'◀▶','-thinner|+wider']);rnum++;
    writGrid([_,'PGUP/PGDN','+long|-short','(' + linelength_adj + ')']);rnum++;
    writGrid([_,'^⇧(F1-F6)','lines(1-6) +longer']);rnum++;
    writGrid([_,'^⇧(1-6)','lines(1-6) -shorter']);rnum++;
    writGrid([_]);rnum++;

    writGrid(['aD','⌥ M','Cycle circles','(' + cycle_circles + '/'+num_of_circles+')']);rnum++;
    writGrid(['aR','⌥ R','Cycle colors','(' + cycle_colors + '/'+num_of_colors+')']);rnum++;
    writGrid(['aG','⌥ G','Cycle audio','(' + cycle_audio  + '/'+num_of_audios+')']);rnum++;
    writGrid(['aU','⌥ U','Cycle dataset','(' + cycle_dataset+ '/'+num_of_datasets+')']);rnum++;
    writGrid(['aK','⌥ K','Cycle paths','(' + cycle_path   + '/'+num_of_paths+')']);rnum++;
    writGrid(['aV','⌥ V','Cycle Polygons','(' + cycle_poly   + '/'+num_of_polys+')']);rnum++;
    writGrid(['aA','⌥ A','Cycle Presets','(' + cycle_preset + '/'+num_of_presets+')']);rnum++;
    writGrid(['aC','⌥ C','Cycle Vars','(' + cycle_vars+')']);rnum++;
    writGrid([_]);rnum++;
    writGrid(['aN','⌥ (N|B)','Circle radius  +/-',   '(' +circle_radius+')']);rnum++;
    writGrid(['aX','⌥ (X|Z)','Cicles opacity +/-',   '(' +circle_opacity+')']);rnum++;
    writGrid(['aO','⌥ (O|I)','Poly opacity   +/-',   '(' + poly_opacity + ')']);rnum++;

    writGrid([_,'⌥ J','Jump fwd 5°']);rnum++;
    writGrid([_]);rnum++;
    writGrid(['ca1-ca6','^⌥ (1-6)','Toggle Hide lvl 1-6',   '(' + show_0 + show_1 + show_2 + show_3 + show_4 + show_5 + ')']);rnum++;
    writGrid(['a0','^⌥ 0','Toggle All Lines','(' + show_all_lines + ')']);rnum++;
    writGrid([_]);rnum++;
    writGrid([_,'^⇧Z','Show/Hide this menu']);rnum++;
    writGrid([_,'^Y','Toggle audio','(' + sound_initialized + ')']);rnum++;
    writGrid([_,'SPACE','Pause/Run']);rnum++;
    writGrid([_]);rnum++;
    writGrid([_]);rnum++;
    writGrid([_]);rnum++;
    writGrid([_]);rnum++;
    writGrid([_]);rnum++;
    writGrid([_]);rnum++;
    writGrid([_]);rnum++;
    if (loop_delay < 4) {
        menu_fontweight="600";menu_fontclr="RED";
        writGrid(['✅','WARNING',"Too fast: Expect unpredictable results and/or browser crash (eventually)."]);rnum++;
    } else {
        writGrid([_]);rnum++;
    }
    writGrid([_]);rnum++;
    writGrid(['°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°']);rnum++;
    writGrid([_]);rnum++;
    writGrid(['Query String']);rnum++;

    //@ ARGS
    let qs = makeQs(href).match(/.{1,140}/g);
    for (i=0;i<qs.length;i++) {
        writGrid([qs[i]]);rnum++;
    }
    writGrid([_]);rnum++;
    writGrid(['TIME PER CYCLE: '+cycletime+'/ Current Angle: '+branch_angle % 360]);rnum++;
    writGrid(['v.'+_VERSION+ " https://github.com/tholonia/notclock"]);rnum++;
    //wTextLeft({'str':'TIME PER REPEAT: '+tot_cycletime          ,'row':rnum, 'col':0});;rnum++;
    //wTextLeft({'str':'TOTAL UNIQUE FORMS: '+tot_images.toLocaleString("en-US")          ,'row':rnum, 'col':0});;rnum++;                
    rnum = 0;
    //? report mouse x/y position on teh screen
    writGrid([_,_,_,_,"x="+point.x+" y="+point.y])

}
//! ┌───────────────────────────────────────────────
//! │ build the query string
//! └───────────────────────────────────────────────
function makeQs(qs) {
    // let qs = "https://tholonia.com/Images/SVG/notclock.svg"
    // let qs = "file:///home/jw/store/src/music/clock_1.svg"
    // log("Makeqs: "+loop_delay)
    qs = qs + "?"
    qs = qs + "up=" + loop_delay
    qs = qs + "&de=" + deg_adj
    qs = qs + "&aN=" + circle_radius
    qs = qs + "&aR=" + cycle_colors
    if (show_all_lines == 0) {qs = qs + "&a0=" + show_all_lines;}
    if (show_0 == 0) {qs = qs + "&ca0=" + show_0;}
    if (show_1 == 0) {qs = qs + "&ca1=" + show_1;}
    if (show_2 == 0) {qs = qs + "&ca2=" + show_2;}
    if (show_3 == 0) {qs = qs + "&ca3=" + show_3;}
    if (show_4 == 0) {qs = qs + "&ca4=" + show_4;}
    if (show_5 == 0) {qs = qs + "&ca5=" + show_5;}
    qs = qs + "&aV=" + cycle_poly
    qs = qs + "&aO=" + poly_opacity
    qs = qs + "&aG=" + cycle_audio
    qs = qs + "&aX=" + circle_opacity
    qs = qs + "&aK=" + cycle_path
    qs = qs + "&aU=" + cycle_dataset
    qs = qs + "&aA=" + cycle_preset
    qs = qs + "&aC=" + cycle_vars
    qs = qs + "&aM=" + cycle_circles
    //@ ARGS
    return(qs)
}



//! ┌───────────────────────────────────────────────
//! │ recursive collection of nodes and edges that form a tree
//! └───────────────────────────────────────────────
function drawTree(branch_angle, rotation) {

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
                // case 'up':  loop_delay      = parseFloat(qsary[key]); break;  //? loop_delay can't be set here??
                case 'de': deg_adj         = parseFloat(qsary[key]); break;  //? keep control manual
                case 'aN': circle_radius   = parseFloat(qsary[key]); break;
                case 'aR': cycle_colors    = qsary[key]; break;
                case 'a1': show_0          = qsary[key]; break;
                case 'a2': show_1          = qsary[key]; break;
                case 'a3': show_2          = qsary[key]; break;
                case 'a4': show_3          = qsary[key]; break;
                case 'a5': show_4          = qsary[key]; break;
                case 'a6': show_5          = qsary[key]; break;
                case 'a0': show_all_lines  = qsary[key]; break;
                case 'aV': cycle_poly      = qsary[key]; break;
                case 'aO': poly_opacity    = parseFloat(qsary[key]); break;
                case 'aG': cycle_audio     = qsary[key]; break;
                case 'aX': circle_opacity  = parseFloat(qsary[key]); break;
                case 'aK': cycle_path      = qsary[key]; break;
                case 'aU': cycle_dataset   = qsary[key]; break;
                case 'aC': cycle_vars     = qsary[key]; break;
                case 'aM': cycle_circles    = qsary[key]; break;
                // case 'aA':  cycle_preset    = qsary[key]; break;  //? it makes no sense to use this one
            }
        }
        preset_changed = false
        console.log("Preset changed: "+preset_changed)

    }
    //% ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡

    clearCanvas()

    //? rebuild timing data based on changes in specs
    tt = cycletimes(loop_delay, deg_adj, genangLEFT, genangRIGHT)
    cycletime = tt['cycletime']
    tot_cycletime = tt['tot_cycletime']
    tot_images = tt['tot_images']

    if (cycle_colors == 2) {
        for (let i = 0; i < 7; i++) {
            colors2[0][i] = generateRandomColor()
        }
    }
    if (cycle_colors == 1) {
        for (let i = 0; i < 7; i++) {
            colors2[0][i] = generateColor(cycle_in_range(tree_counter + (i * 45), 0, 360, 0))
        }
    }

    //% █████████████ ADJUSTMENTS █████████████
    //% let noteseed = (54+tree_counter+ rotation)%108+108


    //? ALT CHARACTERS
    //  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z  <- all
    //        D E F   H                                      <- USED BY BRAVE
    // A  B         G   I J K   M   O     R     U V   X   Z  <- USED BY THIS APP 
    //%     C                 L   N   P     S T         Y    <- AVAILABLE

    // KeyD only works once... using KeyJ is OK
    // KeyH seems to not reapond at all

    writeMenu()


    /*
    this part is very confusing...  we need to swap 'rotation' and 'branch_angle' otherwise we get a line all rotating inteh same directions around their centers, 
    i.e., there is no symetrical balance, only rotational uniformity.  

    This swapping could also be accomplished but reversing the declared names in the function, i.e., 'function drawTree(rotation, branch_angle)', as this also keeps 'branch_angle' 
    values assigned to 'branch_angle' variable. 

    HOWEVER, 

    */
    //? this call has the arguments in the order they are called in 'Tree'
    // var draw_tree = new Tree(gens, this_length, start_x, start_y, branch_angle, rotation);
    //? but we need to use THIS swapped args to get symetrical results
    // console.log("branch_angle:",branch_angle)
    var draw_tree = new Tree(gens, this_length, start_x, start_y, rotation, branch_angle);

    var draw_edges = getTreeEdges(draw_tree);
    var svg = document.getElementById("svg");

    gen = 0
 

    //* ████████████████████████████████████████████████
    //* ███████████████████ DATASETS ███████████████████
    //* ████████████████████████████████████████████████

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
    //* ████████████████████████████████████████████████


    
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

        //@ DEBUG Doesn't exactly do what I want
        let limiter = Math.round(1 / (Math.abs((loop_delay / 1000))))
        // path_width = cycle_in_range(tree_counter, 2,10)
        // if (tree_counter % limiter == 0) {
        //     log(tree_counter)
        //     log(tree_counter%20)
        //     log(path_width)
        // }

        //? prepare the gradiant stroke for the PATHS

        var svgns = 'http://www.w3.org/2000/svg';
        var defs = document.createElementNS(svgns, 'defs');
        var gradient = document.createElementNS(svgns, 'radialGradient');
        var stops = [{"color": "white","offset": "0%"},{"color": "#000000","offset": "100%"}];

        for (var i = 0, length = stops.length; i < length; i++) {
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', stops[i].offset);
            stop.setAttribute('stop-color', stops[i].color);
            gradient.appendChild(stop);
        }
//@ XYZ
        gradient.id = 'datasetGradient';
        gradient.setAttribute('cx', '0.5');
        gradient.setAttribute('cy', '0.3');  //? light is slightly above horizon
        gradient.setAttribute('r', '1');
        defs.appendChild(gradient);
        newPath_l.setAttribute('fill', 'url(#datasetGradient)');
        newPath_r.setAttribute('d', ""+path_r[gen]);
        newPath_r.setAttribute("fill-opacity", "0");
        newPath_r.setAttribute("stroke-width", path_width);
        newPath_r.setAttribute('stroke', 'url(#datasetGradient)');
        svg.appendChild(defs);
        svg.appendChild(newPath_r);

        newPath_l.setAttribute('d', ""+path_l[gen]);
        newPath_l.setAttribute("fill-opacity", "0");
        newPath_l.setAttribute("stroke-width", path_width);
        newPath_l.setAttribute('stroke', 'url(#datasetGradient)');
        svg.appendChild(defs);
        svg.appendChild(newPath_l);
    }

    for (let idx = 0; idx<adata_right.length; idx++) {
        nx1 = adata_right[idx].x
        ny1 = adata_right[idx].y
        nx2 = adata_left[idx].x
        ny2 = adata_left[idx].y

        //? create LINE instance
        var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLine.setAttribute('x1', nx1.toString());
        newLine.setAttribute('y1', ny1.toString());
        newLine.setAttribute('x2', nx2.toString());
        newLine.setAttribute('y2', ny2.toString());

        let order = lOrder[gen] //? get the actual gen value from the gens, which goes uo to 126


        //@ ████████████████████████████████████████████████
        //@ ███████████████████ CIRCLES ████████████████████
        //@ ████████████████████████████████████████████████

        //? add circle
        var totcirc = 3
   
        //% █████████████ ADJUSTMENTS █████████████

        if (cycle_vars == 1) {
            circle_radius = cycle_in_range(Math.round(branch_angle),0,30)
        }

        var cr_rad = Math.round(circle_radius*((7-order)/3)) //? this is small so we can cycles throug the circle-types

        // if (cycle_circles > 0) { //? we have a circle
            if (cycle_circles == 1) { 

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


            if (cycle_circles == 2) {
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
            if (cycle_circles == 3) {
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
        // }

            //@ ████████████████████████████████████████████████

            //? ████████████████████████████████████████████████
            //? ███████████████████ POLYS ██████████████████████
            //? ████████████████████████████████████████████████

            var poly_arr = false

            if (cycle_poly == 1) {
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
            if (cycle_poly == 2) {
                // console.log("Usng polugon 2")
                poly_arr =
                        [
                            [nx2, ny2],
                            [
                                (nx1 - 10) * Math.cos(rotation) - (nx2 + 10) * Math.sin(rotation),
                                (ny1 + 10) * Math.cos(rotation) + (ny2 + 10) * Math.sin(rotation),
                            ],
                            [
                                (nx1 + 10) * Math.cos(rotation) + (nx2 - 10) * Math.sin(rotation),
                                (ny1 - 10) * Math.cos(rotation) - (ny2 - 10) * Math.sin(rotation),
                            ],
                        ];
            }
            if (cycle_poly == 3) {
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
            if (cycle_poly == 4) {
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

            if (cycle_poly > 0) {


            //? prepare the gradiants fpr poly and stroke stroke for the PATHS
            var svgns = 'http://www.w3.org/2000/svg';
            var defs = document.createElementNS(svgns, 'defs');
            var fillGradient = document.createElementNS(svgns, 'linearGradient');
            var strokeGradient = document.createElementNS(svgns, 'linearGradient');
            //? stop #1
            // let pct = Math.round(point.x * 0.0637755102).toString()+"%"
            // log(pct)

            // let limiter = Math.round(1 / (Math.abs((loop_delay / 500))))
            tc = Math.round(rotation) //@ reversed
            // if (tree_counter % limiter == 0) {
                // tree_counter = (poly_clr_idx +1)%360
                // log(poly_clr_idx)
                idx1 = tc%360
                idx2 = tc*90%360
                idx3 = tc*112%360

                let c1 = colors2[1][idx1]
                let c2 = colors2[1][idx2]
                let c3 = colors2[1][idx3]
            // console.log(c1,c2,c3,idx1,idx2,idx3)

                // idx4 = tc%360
                // idx5 = tc+33%360
                // idx6 = tc+66%360
            // }

            // log(idx1+':'+idx2+':'+idx3+':'+idx4+':'+idx5+':'+idx6)
            var fillGradient_stops = [
                // {"color":  colors2[0][order + gens],"offset": "100%"},
                {"color":  c1,"offset":  "33%"},
                {"color":  c2,"offset": "63%"},
                {"color":  c3,"offset":  "100%"},
            ];
            for (var i = 0, length = fillGradient_stops.length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', fillGradient_stops[i].offset);
                stop.setAttribute('stop-color', fillGradient_stops[i].color);
                fillGradient.appendChild(stop);
            }
            //? stop #2

                idx4 = tc%360
                idx5 = tc+270%360
                idx6 = tc+248%360


                let c4 = colors2[1][idx4]
                let c5 = colors2[1][idx5]
                let c6 = colors2[1][idx6]
            var strokeGradient_stops = [
                // {"color": generateRandomColor() ,"offset": "0%"},
                // {"color": colors2[0][order + gens],"offset": "100%"}
                {"color": "black" ,"offset": "33%"},
                {"color": "white","offset": "63%"},
                {"color": "black","offset": "100%"}
            ];
            for (var i = 0, length = strokeGradient_stops.length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', strokeGradient_stops[i].offset);
                stop.setAttribute('stop-color', strokeGradient_stops[i].color);
                strokeGradient.appendChild(stop);
            }

            fillGradient.id = 'fillGradient';
            fillGradient.setAttribute('x1', '0%');
            fillGradient.setAttribute('x2', '0%');
            fillGradient.setAttribute('y1', '0%');
            fillGradient.setAttribute('y2', '100%');

            strokeGradient.id = 'strokeGradient';
            strokeGradient.setAttribute('x1', '0%');
            strokeGradient.setAttribute('x2', '0%');
            strokeGradient.setAttribute('y1', '0%');
            strokeGradient.setAttribute('y2', '100%');

            defs.appendChild(fillGradient);
            defs.appendChild(strokeGradient);

            let poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute("points", poly_arr);
            // poly.setAttribute("fill", colors2[0][order + gens].toString());
            poly.setAttribute('fill', 'url(#fillGradient)');
            poly.setAttribute('stroke', 'url(#strokeGradient)');
            poly.setAttribute("opacity", poly_opacity);
            //poly.setAttribute("fill", generateRandomColor());
            //poly.setAttribute("stroke", generateRandomColor());
            poly.setAttribute("stroke-width", '1');
            poly.setAttribute("stroke-linecap", "round");

        svg.appendChild(defs);
        svg.appendChild(poly);

            //@ XYZ
        }
        //? ████████████████████████████████████████████████

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
        if (show_all_lines == 1) {
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

        //! ████████████████████████████████████████████████
        //! ███████████████████ SOUND ██████████████████████
        //! ████████████████████████████████████████████████
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
        //! ████████████████████████████████████████████████
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
function call_log(txt) {
    console.log("\t\t"+txt)
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
        path_width = 4
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
        path_width=3
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
        path_width=3
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
        // jstr(path)
        return path
    }
    //? CUBIC CURVE v2 - mosty curvy
    function makepath_CS2(q) {
        path_ary = []
        path=[0,0,0,0,0,0]
        path_width=4  

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
        path_width = 2
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
        path_width=2
        path_ary = []
        path=[0,0,0,0,0,0]
        path_width=2  //? this is a very dense and bust path, so thinner lines

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
 

    if (cycle_path == 1) {
        path_r = makepath_CS2(1); path_l = makepath_CS2(-1); //? works
    }
    if (cycle_path == 2) {
        path_r = makepath_CS(1); path_l = makepath_CS(-1);  //? works
    }
    if (cycle_path == 3) {
        path_r = makepath_QT(1); path_l = makepath_QT(-1);  //? works
    }
    if (cycle_path == 4) {
        path_r = makepath_LA(1); path_l = makepath_LA(-1);  //? works
    }
    if (cycle_path == 5) {
        path_r = makepath_CS3(1); path_l = makepath_CS3(-1);  //? works
    }
    if (cycle_path == 6) {
        path_r = makepath_CS4(1); path_l = makepath_CS4(-1);  //? works
    }

    return [path_r, path_l]        
}
