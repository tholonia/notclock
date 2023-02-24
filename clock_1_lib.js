
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

//! ┌───────────────────────────────────────────────
//! │ interface to wTL
//! └───────────────────────────────────────────────
function writGrid(args) {

    let mCols = menuCols
    var fclrs = false
    if (bg_color == "black") {
        fclrs = ['grey','yellow','white','green','white'] 
    } else {
        fclrs = ['grey','blue','black','orange','black']         
    }
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
//! ┌───────────────────────────────────────────────
//! │ wtite text from left->right in grod format
//! └───────────────────────────────────────────────
function wTL(args) {
    // row,col
    let fs = menu_fontsize
    let spacing = menu_spacing

    // if (showtext == true) {
        xpos = (args['col'] * 1) - 960  //? viewbox is x=1920 y=1024 w. 0,0 as dead center, leftmost col is -960
        // log("xpos:"+xpos+' - '+args['col'])
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

        return (document.getElementById('id-wtP1'));
    // }
}
//! ┌───────────────────────────────────────────────
//! │ all the menu and screen text is written here
//! └───────────────────────────────────────────────
function writeMenu() {
    // if (cycle_vars != 0) {
    //     var longqs = "";
    //     //? always send a copy of the qs to the console when in cycla_vars mode
    //     let qs = makeQs(href).match(/.{1,140}/g);  //? limit chars to line to 140, return array of lines
    //     for(let i = 0; i < qs.length; i++ ) {
    //         longqs = longqs + qs[i];
    //     }
    //     console.log("LATEST QUERY STRING: ",longqs);
    // }
    if (showtext == 0) {return}
    if (fullscreen == 0) {
        menu_fontweight="600";menu_fontclr="#00ffff"; writGrid(['✅',_,_,_,'⌥ = Alt']);
        menu_fontweight="600";menu_fontclr="#00ff00"; writGrid(['✅',_,_,'⇧ = Shift']);
        menu_fontweight="600";menu_fontclr="#ff00ff"; writGrid(['✅',_,'^ = Ctrl'])
        menu_fontweight="600";menu_fontclr="red"; writGrid(['✅','NOTE:']);rnum++;
        //? the above are all written on the same line, as they have to "rnum++' at the end.
        writGrid(['°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°']);rnum++;
        menu_fontweight="300"
        writGrid([_,'HOME','Toggle BG (B/W)']);rnum++;
        writGrid(['up','▲ ▼','+fast|-slow','(' + loop_delay / 1000 + 's)']);rnum++;
        writGrid([_,'◀▶','-thinner|+wider']);rnum++;
        writGrid([_,'PGUP/PGDN','+zoom in|-zoom out','(' + linelength_adj + ')']);rnum++;
        writGrid(['de','INS/DEL','+Finer|Courser','(' + deg_adj + ')']);rnum++;
        writGrid([_,'^⇧(F1-F6)','lines(1-6) +longer']);rnum++;
        writGrid([_,'^⇧(1-6)','lines(1-6) -shorter']);rnum++;
        writGrid([_]);rnum++;

        writGrid(['aM','⌥ M','Cycle circles','(' + cycle_circles + '/'+num_of_circles+') ' +names_of_circles[cycle_circles]]);rnum++;
        writGrid(['aR','⌥ R','Cycle colors','(' + cycle_colors + '/'+num_of_colors+') ' +names_of_colors[cycle_colors]]);rnum++;
        writGrid(['aG','⌥ G','Cycle audio','(' + cycle_audio  + '/'+num_of_audios+') '+names_of_audios[cycle_audio]]);rnum++;
        writGrid(['aU','⌥ U','Cycle dataset','(' + cycle_dataset+ '/'+num_of_datasets+') '+names_of_datasets[cycle_dataset]]);rnum++;
        writGrid(['aK','⌥ K','Cycle paths','(' + cycle_path   + '/'+num_of_paths+') '+names_of_paths[cycle_path]]);rnum++;
        writGrid(['aV','⌥ V','Cycle Polygons','(' + cycle_poly   + '/'+num_of_polys+') '+names_of_polys[cycle_poly]]);rnum++;
        writGrid(['aA','⌥ A','Cycle Presets','(' + cycle_preset + '/'+num_of_presets+')']);rnum++;
        writGrid(['aC','⌥ C','Cycle Vars','(' + cycle_vars+') '+names_of_vars[cycle_vars]]);rnum++;
        writGrid([_]);rnum++;
        writGrid(['aN','⌥ (N|B)','Circle radius  +/-',   '(' +circle_radius+')']);rnum++;
        writGrid(['aX','⌥ (X|Z)','Circle opacity +/-',   '(' +circle_opacity+')']);rnum++;
        writGrid(['aO','⌥ (O|I)','Poly opacity   +/-',   '(' + poly_opacity + ')']);rnum++;
        writGrid(['aS','⌥ (S|W)','Merge Count   +/-',   '(' + merge_count + ')']);rnum++;
        writGrid(['aT','⌥ T','Dynamic Zoom on/off',   '(' + zoomin + ')']);rnum++;

        writGrid([_,'⌥ J','Jump fwd 5°']);rnum++;
        writGrid([_]);rnum++;
        writGrid(['ca1-ca6','^⌥ (1-6)','Toggle Hide lvl 1-6',   '(' + show_0 + show_1 + show_2 + show_3 + show_4 + show_5 + ')']);rnum++;
        writGrid(['ca0','^⌥ 0','Show/Hide All Lines','(' + show_all_lines + ') '+names_of_show_all_lines[show_all_lines]]);rnum++;
        writGrid([_]);rnum++;
        writGrid([_,'^⇧Z','Show/Hide this menu']);rnum++;
        writGrid([_,'^Y','Toggle audio','(' + sound_initialized + ')']);rnum++;
        writGrid(['aP','⌥ P','Screen Save','(' + screensave + ')']);rnum++;
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
        writGrid([_]);rnum++;
        //@ ARGS
        writGrid(['Query String']);rnum++;
        let qs = makeQs(href).match(/.{1,140}/g);  //? limit chars to line to 140, return array of lines
        let ba = (branch_angle % 360).toFixed(2)
        for (i=0;i<qs.length;i++) {
            writGrid([qs[i]]);rnum++;
        }
        writGrid([_]);rnum++;
        writGrid(['TIME PER CYCLE: '+cycletime+'/ Current Angle: '+ba]);rnum++;
        writGrid(['v.'+_VERSION+ " https://github.com/tholonia/notclock"]);rnum++;
        //wTextLeft({'str':'TIME PER REPEAT: '+tot_cycletime          ,'row':rnum, 'col':0});;rnum++;
        //wTextLeft({'str':'TOTAL UNIQUE FORMS: '+tot_images.toLocaleString("en-US")          ,'row':rnum, 'col':0});;rnum++;                
        rnum = 0;
        //? report mouse x/y position on teh screen
//        writGrid([_,_,_,_,"x="+gMin_x+":"+gMax_x+" y="+gMin_y+":"+gMax_y]);rnum++
//        writGrid([_,_,_,_,"x="+point.x+" y="+point.y]);rnum++
//        writGrid([_]);rnum++;
//        writGrid([_,_,_,_,"x="+point.sx+" y="+point.sy]);rnum++
//        writGrid([_]);rnum++;
//        writGrid([_,_,_,_,"x="+point.px+" y="+point.py]);rnum++
//        writGrid([_]);rnum++;
        writGrid([_,_,_,_,"x="+point.vx+" y="+point.vy]);rnum++
    }
}
//! ┌───────────────────────────────────────────────
//! │ build the query string
//! └───────────────────────────────────────────────
function makeQs(qs) {
    // let qs = "https://tholonia.com/Images/SVG/notclock.svg"
    // let qs = "file:///home/jw/store/src/music/clock_1.svg"
    // log("Makeqs: "+loop_delay)
    qs = qs + "?"
    if (loop_delay      != DEF_loop_delay)      {qs = qs + "up="  + loop_delay;}
    if (iangle          != DEF_iangle)          {qs = qs + "&ia=" + iangle;}
    if (deg_adj         != DEF_deg_adj)         {qs = qs + "&de=" + deg_adj;}
    if (circle_radius   != DEF_circle_radius)   {qs = qs + "&aN=" + circle_radius;}
    if (cycle_colors    != DEF_cycle_colors)    {qs = qs + "&aR=" + cycle_colors;}

    if (show_all_lines  != DEF_show_all_lines)  {qs = qs + "&ca0=" + show_all_lines;}

    if (show_0 != DEF_show_0) {qs = qs + "&ca0=" + show_0;}
    if (show_1 != DEF_show_1) {qs = qs + "&ca1=" + show_1;}
    if (show_2 != DEF_show_2) {qs = qs + "&ca2=" + show_2;}
    if (show_3 != DEF_show_3) {qs = qs + "&ca3=" + show_3;}
    if (show_4 != DEF_show_4) {qs = qs + "&ca4=" + show_4;}
    if (show_5 != DEF_show_5) {qs = qs + "&ca5=" + show_5;}

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
    //@ ARGS
    return(qs)
}
//! ┌───────────────────────────────────────────────
//! │ funcs to track tey min/max xy
//! └───────────────────────────────────────────────
function xytrack(x,y) {
    if (x>gMax_x) {gMax_x = x;}
    if (x<gMin_x) {gMin_x = x;}
    if (y>gMax_y) {gMax_y = y;}
    if (y<gMin_y) {gMin_y = y;}
}
function updateListMinMax(data) {
    //? no need to traxk if zoom is not on
    if (zoomin ==1) {
        for (i=0;i<data.length;i++) {
            xytrack(data[i][0],data[i][1]);
            // console.log("xytrack("+data[i][0]+","+data[i][1]+")=>"+gMax_x+","+gMin_y)
        }
    }
}
function updateObjMinMax(data) {
    for (i=0;i<data.length;i++) {
        for (j=0;j<data[i].length;j++){
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

    vbMaxX = xmax+100
    vbMaxY = ymax+100
    vbMinX = xmin-100
    vbMinY = ymin-100
    vbLen = vbMaxX-vbMinX
    vbHei = vbMaxY-vbMinY

    let vbstr =  vbMinX.toString()+" "+vbMinY.toString()+" "+vbLen.toString()+" "+vbHei.toString();
    eleSvg.setAttribute("viewBox", vbstr);
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

    vbMaxX = xmax+100
    vbMaxY = ymax+100
    vbMinX = xmin-100
    vbMinY = ymin-100
    vbLen = vbMaxX-vbMinX
    vbHei = vbMaxY-vbMinY

    // let vbstr =  vbMinX.toString()+" "+vbMinY.toString()+" "+vbLen.toString()+" "+vbHei.toString();
    // eleSvg.setAttribute("viewBox", vbstr);

    zoomvb(xmin, xmax, ymin, ymax);
}
//! ┌───────────────────────────────────────────────
//! │ func to alter the colors
//! └───────────────────────────────────────────────
//? https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors#:~:text=Just%20pass%20in%20a%20string,number%20(i.e.%20%2D20%20).
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

// // Tests:

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
// pSBCr ( color4 ); // #5567DAF0 + [Rip] => [object Object] => {'r':85,'g':103,'b':218,'a':0.941}


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
  }
}
//! ┌───────────────────────────────────────────────
//! │ recursive collection of nodes and edges that form a tree
//! └───────────────────────────────────────────────
function drawTree(branch_angle, rotation) {
        //FIXME for some reason, these angles do not appear when integers!  Javascript really sucks!!
        //@ AND!!! is a do a toFixed(2), branch_angle becomes rotation !!!!!!!
        branch_angle = parseFloat(branch_angle%360);
        branch_angle = branch_angle + 0.00001 //? more that 4 0s and lines begin to disappear
        rotation = rotation%360
//        log(branch_angle)

        // branch_angle = branch_angle+0.001s
        // if (branch_angle == 45*0 || 
        //     branch_angle == 45*1 ||
        //     branch_angle == 45*2 ||
        //     branch_angle == 45*3 ||
        //     branch_angle == 45*4 ||
        //     branch_angle == 45*5 ||
        //     branch_angle == 45*6 ||
        //     branch_angle == 45*7 
        //     ) {
        //     branch_angle = branch_angle+0.001
        // }

        //% ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
        //%
        //%                            888                                                 
        //%                            888                                                 
        //%                            888                                                 
        //%  .d8888b 888  888  .d8888b 888  .d88b.      888  888  8888b.  888d888 .d8888b  
        //% d88P"    888  888 d88P"    888 d8P  Y8b     888  888     "88b 888P"   88K      
        //% 888      888  888 888      888 88888888     Y88  88P .d888888 888     "Y8888b. 
        //% Y88b.    Y88b 888 Y88b.    888 Y8b.          Y8bd8P  888  888 888          X88 
        //%  "Y8888P  "Y88888  "Y8888P 888  "Y8888        Y88P   "Y888888 888      88888P' 
        //%               888                                                              
        //%          Y8b d88P                                                              
        //%           "Y88P"                                                               
        //%
        //% ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

        if (cycle_vars > 0) {

            for (i=0;i<6;i++) {
                pensize[i] = cycle_in_range(Math.round(branch_angle),0,DEF_pensize[i],0) //? use initialial values of pensize[]
                pre_maxlengths[i] = cycle_in_range(Math.round(branch_angle),0,DEF_pre_maxlengths[i],0)  //? use initialial values of pre_maxlengths[]
            }

            //? non-deterministic selection
            cycle_circles   = randint(0, num_of_circles)
            //? tmp disable
            cycle_path      = randint(0,num_of_paths)
            cycle_dataset   = randint(0,1)
            cycle_colors    = randint(0,num_of_colors)
            circle_radius   = randint(5,20)
            circle_opacity  = randint(1,100)/100
            if (cycle_vars == 2) { //? don't change poly setting 
                cycle_poly = DEF_cycle_poly;
            } else {
                cycle_poly      = randint(0,num_of_polys)  
            }

            // //? deterministic selection
            // cycle_circles   = (cycle_circles + 1) % num_of_circles
            // //? tmp disable
            // //? cycle_path      = (cycle_path + 1) % num_of_paths
            // cycle_dataset   = (cycle_dataset + 1) % 2  //? less than 'num_of_datasets' ... too many
            // circle_opacity  = cycle_in_range(Math.round(branch_angle),0,100,0)/100
            // circle_radius   = cycle_in_range(Math.round(branch_angle),5,20)

            // //? don't change poly setting if aC=2
            // if (cycle_vars == 2) { 
            //     cycle_poly  = DEF_cycle_poly;
            // } else {
            //     cycle_poly  = (cycle_poly + 1) % num_of_polys
            // }
            // //? leave colors alone if aC=3
            // if (cycle_vars != 3) { //? don't change poly setting 
            //     cycle_colors    = (cycle_colors + 1) % num_of_colors
            // }
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
                case 'aA':  cycle_preset   = qsary[key]; break;  //? it makes no sense to use this one
                case 'aT':  zoomin         = qsary[key]; break;  //? it makes no sense to use this one
                case 'aP':  screensave     = qsary[key]; break;  //? it makes no sense to use this one
            }
        }
        preset_changed = false
        console.log("Preset changed: "+preset_changed)
    }
    //% ≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡≡
    if (merge_count == 0) {
        clearCanvas()        
    } else {
        if (tree_counter%merge_count == 0) {
            clearCanvas()
        }
    }
    //? ────────────────────────────────────────────────
    //? rebuild timing data based on changes in specs
    tt = cycletimes(loop_delay, deg_adj, genangLEFT, genangRIGHT)
    cycletime = tt['cycletime']
    tot_cycletime = tt['tot_cycletime']
    tot_images = tt['tot_images']

    //? ──────────────────────────────────────────────── CYCLE COLORS
    if (cycle_colors == 1) {  //? shift spectrum of 7 color
        for (let i = 0; i < 7; i++) {
            colors2[1][i] = generateColor(cycle_in_range(tree_counter + (i * 45), 0, 360, 0))
        }
    }
    if (cycle_colors == 2) {  //? random colors
        for (let i = 0; i < 7; i++) {
            colors2[2][i] = generateRandomColor()
        }
    }
    //? ────────────────────────────────────────────────
    //% █████████████ ADJUSTMENTS █████████████
    //% let noteseed = (54+tree_counter+ rotation)%108+108
    //? ────────────────────────────────────────────────
    writeMenu()

    //@ this part is very confusing...  we need to swap 'rotation' and 'branch_angle' otherwise we get lines all 
    //@ rotating in the same directions around their centers, i.e., there is no symetrical balance, only rotational uniformity.  
    //@ This swapping could also be accomplished but reversing the declared names in the function, i.e., 
    //@ 'function drawTree(rotation, branch_angle)', as this also keeps 'branch_angle' values assigned to 'branch_angle' variable. 

    //? this call has the arguments in the order they are called in 'Tree'
    // var draw_tree = new Tree(gens, this_length, start_x, start_y, branch_angle, rotation);
    //? but we need to use THIS swapped args to get symetrical results
    // console.log("branch_angle:",branch_angle)
    var draw_tree = new Tree(gens, this_length, start_x, start_y, rotation, branch_angle);

    var draw_edges = getTreeEdges(draw_tree);
    var svg = document.getElementById("svg");

    gen = 0
    //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
    //*
    //* 8888888b.         d8888 88888888888        d8888  .d8888b.  8888888888 88888888888  .d8888b.
    //* 888  "Y88b       d88888     888           d88888 d88P  Y88b 888            888     d88P  Y88b 
    //* 888    888      d88P888     888          d88P888 Y88b.      888            888     Y88b.      
    //* 888    888     d88P 888     888         d88P 888  "Y888b.   8888888        888      "Y888b.   
    //* 888    888    d88P  888     888        d88P  888     "Y88b. 888            888         "Y88b. 
    //* 888    888   d88P   888     888       d88P   888       "888 888            888           "888 
    //* 888  .d88P  d8888888888     888      d8888888888 Y88b  d88P 888            888     Y88b  d88P 
    //* 8888888P"  d88P     888     888     d88P     888  "Y8888P"  8888888888     888      "Y8888P"  
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
    //* 8888888b.         d8888 88888888888 888    888  .d8888b.  
    //* 888   Y88b       d88888     888     888    888 d88P  Y88b 
    //* 888    888      d88P888     888     888    888 Y88b.      
    //* 888   d88P     d88P 888     888     8888888888  "Y888b.   
    //* 8888888P"     d88P  888     888     888    888     "Y88b. 
    //* 888          d88P   888     888     888    888       "888 
    //* 888         d8888888888     888     888    888 Y88b  d88P 
    //* 888        d88P     888     888     888    888  "Y8888P"
    // *
    //* ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

    if (dataform=="buildpath") {
        //? build the paths
        paths = buildpath(xfullary_right)
//        console.log(JSON.stringify(paths),null,2)
        //? paths is just an array of 2 lists or 6 elements each...
        //? [["M0,0","M0,0","M0,0","M0,0","M0,0","M0,0"],["M0,0","M0,0","M0,0","M0,0","M0,0","M0,0",]]
        //? path_r and path_l contains 6 subarrays each

        path_r = paths[0]
        path_l = paths[1]

        path_width = 1 //? override previous setting in buildpath()
        //? reset arrays to initial item only
        xfullary_right = [{'g':7,'x':0,'y':0}]
        xfullary_left = [{'g':7,'x':0,'y':0}]

//        let xgen = gen

        //? each gen is a single path... "M 0,0 C 0,0..."
        //@ DEBUG Doesn't exactly do what I want
        let limiter = Math.round(1 / (Math.abs((loop_delay / 1000))))

        console.log(gen,cycle_colors,colors2)
        let pathclr = colors2[cycle_colors][gen]
        var newPath_r = document.createElementNS(svgns, 'path');
        var newPath_l = document.createElementNS(svgns, 'path');


        //? prepare the gradiant stroke for the PATHS
        var DATdefs = document.createElementNS(svgns, 'defs');
        var gradient = document.createElementNS(svgns, 'radialGradient');
        var stops = [
            {"color": colors2[cycle_colors][gen],      "offset": "0%"},
//            {"color": "#bbbbbb",      "offset": "0%"},
//            {"color": pathclr,      "offset": "0%"},
            {"color": "#000000",    "offset": "100%"}
        ];

        for (var i = 0, length = stops.length; i < length; i++) {
            var stop = document.createElementNS(svgns, 'stop');
            stop.setAttribute('offset', stops[i].offset);
            stop.setAttribute('stop-color', stops[i].color);
            gradient.appendChild(stop);
        }
        gradient.id = 'datasetGradient';
        gradient.setAttribute('cx', '0.5');
        gradient.setAttribute('cy', '0.3');  //? light is slightly above horizon
        gradient.setAttribute('r', '.8');
        DATdefs.appendChild(gradient);

        console.log(gen,path_r)
        newPath_r.setAttribute('d', ""+path_r[gen]);
        newPath_r.setAttribute("fill-opacity", "0");
        newPath_r.setAttribute("stroke-width", path_width);
        newPath_r.setAttribute('stroke', 'url(#datasetGradient)');
        svg.appendChild(DATdefs);
        svg.appendChild(newPath_r);

        //% ████████████████ ADJUSTMENT ████████████████
        // newpensize = pensize[gen] * line_thickness

        newPath_l.setAttribute('d', ""+path_l[gen]);
        newPath_l.setAttribute("fill-opacity", "0");
        newPath_l.setAttribute("stroke-width", path_width);//path_width);//@ SD
        newPath_l.setAttribute('stroke', 'url(#datasetGradient)');
        svg.appendChild(DATdefs);
        svg.appendChild(newPath_l);
    }


    //? loop through the generated data
    //? length of adata_right is 126
    for (let idx = 0; idx<adata_right.length; idx++) {
        //? set the base data vars
        nx1 = adata_right[idx].x
        ny1 = adata_right[idx].y
        nx2 = adata_left[idx].x
        ny2 = adata_left[idx].y

        xytrack(nx2,ny2);

        let order = lOrder[gen] //? get the actual gen value from the gens, which goes up to 126

        //@ ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
        //@
        //@  .d8888b.  8888888 8888888b.   .d8888b.  888      8888888888  .d8888b.
        //@ d88P  Y88b   888   888   Y88b d88P  Y88b 888      888        d88P  Y88b 
        //@ 888    888   888   888    888 888    888 888      888        Y88b.      
        //@ 888          888   888   d88P 888        888      8888888     "Y888b.   
        //@ 888          888   8888888P"  888        888      888            "Y88b. 
        //@ 888    888   888   888 T88b   888    888 888      888              "888 
        //@ Y88b  d88P   888   888  T88b  Y88b  d88P 888      888        Y88b  d88P 
        //@ "Y8888P"  8888888 888   T88b  "Y8888P"  88888888 8888888888  "Y8888P"  
        //@
        //@ ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
                                                                        
        //? add circle
        var totcirc = 3
   
        //% █████████████ ADJUSTMENTS █████████████
        var cr_rad = Math.round(circle_radius*((7-order)/3)) //? this is small so we can cycle through the circle-types

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


//            ns = branch_angle
            ns = cycle_in_range(branch_angle,0,60,0)

            //? This part cals the angle from the viewport x,y.  Noty used here, but good to save
            //@ let cxr =  Math.sin(deg2rad(point.vx))/3+.5
            //@ let cyr =  Math.cos(deg2rad(point.vy))/3+.5
            //@ let cxa = rad2deg(Math.atan2(point.vy,point.vx))
            //@ console.log("cxr",cxr,"cyr",cyr)

            //? This part converts branch_angle to angle of 'light source'
            let cxr =  Math.cos(branch_angle)/3+.5
            let cyr =  Math.sin(branch_angle)/3+.5
//            console.log("cxr",cxr,"cyr",cyr)

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

            svg.appendChild(mCIRdefs[order]);
            svg.appendChild(mCIRcircle[order]);
        }
        //@ ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



        //? ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
        //?
        //? 8888888b.   .d88888b.  888      Y88b   d88P  .d8888b.   .d88888b.  888b    888  .d8888b.
        //? 888   Y88b d88P" "Y88b 888       Y88b d88P  d88P  Y88b d88P" "Y88b 8888b   888 d88P  Y88b 
        //? 888    888 888     888 888        Y88o88P   888    888 888     888 88888b  888 Y88b.      
        //? 888   d88P 888     888 888         Y888P    888        888     888 888Y88b 888  "Y888b.   
        //? 8888888P"  888     888 888          888     888  88888 888     888 888 Y88b888     "Y88b. 
        //? 888        888     888 888          888     888    888 888     888 888  Y88888       "888 
        //? 888        Y88b. .d88P 888          888     Y88b  d88P Y88b. .d88P 888   Y8888 Y88b  d88P 
        //? 888         "Y88888P"  88888888     888      "Y8888P88  "Y88888P"  888    Y888  "Y8888P"
        //?
        //? ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
                                                                                          
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
            }
            if (n == 2) {
                poly_arr = [
                    [nx2, ny2],
                    [
                        nx1 ,
                        cycle_in_range(Math.round(Math.abs((ny1 + 10) * Math.cos(rotation) + (ny2 + 10) * Math.sin(rotation))),-50,50,0)+ny2-ny1,
                    ],
                    [
                        nx1,
                        cycle_in_range(Math.round(Math.abs((ny1 + 10) * Math.cos(rotation) + (ny2 - 10) * Math.sin(rotation))),-50,50,0)+ny2-ny1,
                    ],
                ];
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
            }
            if (n == 4) {
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
                cycle_in_range(tree_counter,0,60,0),//polyColor_1_offset,
                cycle_in_range(tree_counter,20,80,0),//polyColor_2_offset,
                cycle_in_range(tree_counter,40,100,0),//polyColor_3_offset
            ]

            polyColor_1_offset = parseInt(offsets[0])
            polyColor_2_offset = parseInt(offsets[1])
            polyColor_3_offset = parseInt(offsets[2])


            var fillGradient_stops = [
                {"color":  polyColor_1,"offset":  polyColor_1_offset+"%"},  
                {"color":  polyColor_2,"offset":  polyColor_2_offset+"%"},
                {"color":  polyColor_3,"offset":  polyColor_3_offset+"%"},
            ];

            for (var i = 0, length = fillGradient_stops.length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', fillGradient_stops[i].offset);
                stop.setAttribute('stop-color', fillGradient_stops[i].color);
                fillGradient.appendChild(stop);
                // console.log("FILL STOP offsets:",fillGradient_stops[i].offset+"%",fillGradient_stops[i].color)
            }

            //? ------------------------------------
            //? create the gradiant for STROKE
            //? ------------------------------------
            var STdefs = document.createElementNS(svgns, 'defs');
            var strokeGradient = document.createElementNS(svgns, 'linearGradient');

            // let altPolyColor_1 = colors2[cycle_colors][(clrIdx_1+1)%6]
            // let altPolyColor_2 = colors2[cycle_colors][(clrIdx_2+1)%6]
            // let altPolyColor_3 = colors2[cycle_colors][(clrIdx_3+1)%6]
            let altPolyColor_1 = pSBC(-0.6,colors2[cycle_colors][(clrIdx_1+1)%6])
            let altPolyColor_2 = pSBC(-0.6,colors2[cycle_colors][(clrIdx_2+1)%6])
            let altPolyColor_3 = pSBC(-0.6,colors2[cycle_colors][(clrIdx_3+1)%6])

            // console.log("alt colors:",altPolyColor_1,altPolyColor_2,altPolyColor_3)


            //? user the same offsets
            var strokeGradient_stops = [
                {"color":  altPolyColor_1,"offset":  polyColor_1_offset+"%"},  
                {"color":  altPolyColor_2,"offset":  polyColor_2_offset+"%"},
                {"color":  altPolyColor_3,"offset":  polyColor_3_offset+"%"},
            ];

            // console.log("---- STROKE -------------------------------------")
            // console.log("FILL offsets:",polyColor_1_offset+"%",polyColor_2_offset+"%",polyColor_3_offset+"%")

            for (var i = 0, length = strokeGradient_stops.length; i < length; i++) {
                var stop = document.createElementNS(svgns, 'stop');
                stop.setAttribute('offset', strokeGradient_stops[i].offset);
                stop.setAttribute('stop-color', strokeGradient_stops[i].color);
                strokeGradient.appendChild(stop);
                // console.log("FILL STOP offsets:",strokeGradient_stops[i].offset+"%",strokeGradient_stops[i].color)

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
        //? ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

        //% █████████████ ADJUSTMENTS █████████████
        newpensize = pensize[order] * line_thickness
        //% newpensize = cycle_in_range((tree_counter-order)/10*(order+1),1,10,0)


//=========================================================================

        //? DRAW THE LINE
        //? prepare the gradient for the line
        //! The generatio indexing starts at 1, not 0 !!
        linecolors = colors2[cycle_colors]
        mLINEcolor[order] = linecolors[order]

        // console.log(linecolors)

        mLINEdefs[order]    = document.createElementNS(svgns, 'defs');
        mLINEgradient[order]= document.createElementNS(svgns, 'radialGradient');
        mLINEline[order]    = document.createElementNS(svgns, 'line');

        // let c1 = mLINEcolor[cycle_in_range(Math.abs(order+1),0,5,0)]
        let c1 = mLINEcolor[(Math.abs(order+1))%6]

        // let c1 = mLINEcolor[order]
        let c2 = mLINEcolor[order]




        // console.log(nx1,nx,ny1,ny2)

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
        mLINEline[order].setAttribute('x1', nx1.toString())
        mLINEline[order].setAttribute('y1', ny1.toString())
        mLINEline[order].setAttribute('x2', nx2.toString())
        mLINEline[order].setAttribute('y2', ny2.toString())

        mLINEline[order].setAttribute("id", "lines"+gen);
        mLINEline[order].setAttribute('stroke', 'url(#lineGradient'+gen+')');
        // mLINEline[order].setAttribute("opacity", "1");
        mLINEline[order].setAttribute("stroke-width",newpensize);
        mLINEline[order].setAttribute("opacity", opacities[order]);

        svg.appendChild(mLINEdefs[order]);

        //? what lines to show/hide
        if (show_all_lines == 1) {
            if (show_0 == 1 && order == 0) {
                // console.log(show_all_lines,show_0,order)
                // console.log(mLINEline[order])
                svg.appendChild(mLINEline[order]);
            }
            if (show_1 == 1 && order == 1) {
                svg.appendChild(mLINEline[order]);
            }
            if (show_2 == 1 && order == 2) {
                svg.appendChild(mLINEline[order]);
            }
            if (show_3 == 1 && order == 3) {
                svg.appendChild(mLINEline[order]);
            }
            if (show_4 == 1 && order == 4) {
                svg.appendChild(mLINEline[order]);
            }
            if (show_5 == 1 && order == 5) {
                svg.appendChild(mLINEline[order]);
            }
        }
         // if (branch_angle == 90) {debugger}
        gen++;
    };
        //! ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
        //!
        //! .d8888b.   .d88888b.  888     888 888b    888 8888888b.  
        //! d88P  Y88b d88P" "Y88b 888     888 8888b   888 888  "Y88b 
        //! Y88b.      888     888 888     888 88888b  888 888    888 
        //!  "Y888b.   888     888 888     888 888Y88b 888 888    888 
        //!     "Y88b. 888     888 888     888 888 Y88b888 888    888 
        //!       "888 888     888 888     888 888  Y88888 888    888 
        //! Y88b  d88P Y88b. .d88P Y88b. .d88P 888   Y8888 888  .d88P 
        //!  "Y8888P"   "Y88888P"   "Y88888P"  888    Y888 8888888P"
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
        //! ██████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

//@ SD 
    // console.log("drawBox("+gMin_x+","+gMax_x+","+gMin_y+","+gMax_y+")")
    // drawBox(gMin_x, gMax_x, gMin_y, gMax_y)
    //? this only works here (not in listeners)
    if (zoomin == 1) {
        zoomvb(gMin_x, gMax_x, gMin_y, gMax_y)  
        showtext=0; //? turn off the menu, as it is unreadable
    } else {
        if (gMin_x+gMax_x+gMin_y+gMax_y != 0) {
            zoomvb(-960, 960, -512, 512)  
            showtext = 1 //? turn menu back up
        }
    }
}

//? END OF FUNCTION 'drawTree'

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
    return "#" + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16)
    //    { 
    //        r: Math.round(r * 255).toString(16),
    //        g: Math.round(g * 255).toString(16),
    //        b: Math.round(b * 255).toString(16)
    //    };
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
            };
}
//! ┌───────────────────────────────────────────────
//! │ Creates RGB string from a number
//! └───────────────────────────────────────────────
function generateColor(num) {
    var H = (num%360) / 360 //? H range is 0-360, 0 and 360 are both RED
    //@ probably better to MOD the H, not divide
    var S = .8
    var V = .8
    return HSVtoRGB(H, S, V)
}
//! ┌───────────────────────────────────────────────
//! │ Creates RGB string from a number and SV vals
//! └───────────────────────────────────────────────
function generateColorHSV(num,S,V) {
    var H = num / 360 //? H range is 0-360, 0 and 360 are both RED
    //@ probably better to MOD the H, not divide
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
    //? assign sqary_r
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
    //? not sur what I did, but the array is massive and needs to be cleaned up
    var fixed_ary = [ [],[],[],[],[],[] ]
    for (k=0;k<6;k++) {
        for (i=0;i<64;i++) {
            fixed_ary[k].push(sqary_r[k][i*4])
        }
    }
    sqary_r=fixed_ary

    //? join all 6*64 arrays together

    //? CUBIC CURVE v5 - TRUE CURVE - OPEN          #1 True Curve Open
    function makepath_CS1(q) {
        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]
        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M 0 0 "
            j=0
            for (i=1; i<64;i+=1) {
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
        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]
        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M 0 0 "
            j=0
            for (i=1; i<64;i+=1) {
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
        path_width = 2
        path_ary = []
        path=[0,0,0,0,0,0]

        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]
            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (i=1; i<28;i++) {
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
        path_width=2  //? this is a very dense and busy path, so thinner lines

        let x = ""
        for (k=0;k< sqary_r.length;k++) {
            let s = sqary_r[k]

            x = x + "M "+s[0].x*q+","+s[0].y+" "
            j=0
            for (i=1; i<26;i++) {
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
        path_width = 2
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
            x = x + "S "+s[63].x*q+" "+s[63].y+","
            x = x + " "  +s[63].x*q+" "+s[63].y+" "
            path[k]=x
        }    
        return path
    }

    //? CUBIC CURVE v5 - TRUE CURVE call combined- OPEN          #1 True Curve all
    function makepath_CS6(q) {
        var bigary = []
        for (k=0;k<6;k++) {
            for (i=0;i<64;i++) {
                bigary.push(sqary_r[k][i])
            }
        }
        path_width = 1
//        path_ary = []
        path=[]

        let x = ""
        let s = bigary
        x = x + "M 0 0 "
        j=0
//        console.log(s.length)
        for (i=1; i<128;i+=1) {
//        console.log(i,s[i+j].x)
            x = x + "S " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
            x = x + "  " +s[i+j].x*q+" "+s[i+j].y+" ";j++;
//            i= i+j
        }
        for (i=1; i<6;i+=1) {
            path.push(x)
        }
//        console.log(path)
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
//        for (k=0;k< sqary_r.length;k++) {
//            let s = sqary_r[k]
//            x = x + "M "+s[0].x*q+","+s[1].y+" "
//            j=0
//            for (i=1; i<51;i++) {
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
//        for (k=0;k< sqary_r.length;k++) {
//            let s = sqary_r[k]
//            let x = ""
//            x = x + "M "+s[0].x*q+","+s[1].y+" "
//            j=0
//            for (i=1; i<51;i = i++) {
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

    return rs
}




