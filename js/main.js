jQuery(function(){
    /*TO DO:
      -stack options:
        - when nonstack:
          - input data will be comma separated 1-d (hide/show inst.)
          - we dont show stack label @ enter label (hide/show inst.)
          - we only have to check if length of data is same as label
          - color select will only list each individual bar
        - when unistack:
          -input data will be 2d (hide/show inst)
          -input data must be rectangular matrix (row length must match)
          -we need both data label and stack label
          -stack label should be 1d array that is as long as data[0]


          color select will ask if you want to set stack colors consistent for every back
            - if yes -> set colors for just stack labels
            - if no -> set colors for each stack label for each bar

        - arbitrary stacking:
          -input data 2d of any size
          -input label must match data size
          -we need data label and stack label
          data label 1d stack label 2d
          - color select: automatically for every stack label.

      - font sync option:
        - when font sync is checked:
          - remove all font and font color select from title, axes, legend
          - show font and font color select in overall settings
        - when no sync:
          - show font and font color select in title, axes, legend
          -hide font and font color select in overall settings

      -bar colors
        - set one color option -> yes
          - only display 1 color select option
        - no
          -display whatever settings set above


    DYNAMIC COMPONENTS:
      - instructional p in enter data and label
      - bar color select setting
      - font and font color select in title, axes, legend
    */
  let data = [];
  let options = {
    type: 0,

    label:{
      barLabel:[],
      stackLabel:[]
    },

    dim:{
      width: 500,
      height: 500
    },

    font:{
      sync:false,
      type:'Arial',
      color:'#000000'
    },

    bColor:{
      allSync:true,
      stackSync:false,
      allColor:'#ff0000',
      colors:{},
      stackColors: {}
    },

    title:{
      text:'Graph Title',
      size:50,
      font:'Arial',
      color:'#000000'
    },

    axis:{
      xshow:true,
      xcolor:'#000000',
      xfont:'Arial',
      xsize:10,
      xangle:0,

      yshow:true,
      ycolor:'#000000',
      yfont:'Arial',
      ysize:10,
      yangle: 0,
      numticks: 0
    },

    legend:{
      loc: 'upL',
      show:true,
      height:40,
      width:40,
      font: 'Arial',
      color: '#000000'
    }
  };

  //TYPE STTINGS
  //TO DO: IF DATA AND LABELS ARE ALREADY PRESENT AND TYPE CHANGES, RESET DATA AND LABELS AND PROMPT USER TO RE-ENTER
  //CLEAR BAR COLOR SETTINGS: REMOVE ALL .barColor elements, remove saved colors in object, and check colorsync off.

  $('input[type=radio][name=type]').on('change', ()=>{
    let value = $('input[name=type]:checked').val();
    let $slLabel, $slText, $slInst, $slButton;

    if(data.length !== 0 || options.label.barLabel.length !== 0){
      data = [];
      options.label.barLabel = [];
      options.label.stackLabel = [];
      options.bColor.allSync = true;
      options.bColor.stackSync = false;
      options.bColor.colors = {};
      options.bColor.stackColors = {};

      $('#data').val('');
      $('#dataLabel').val('');
      $('#stackLabel').val('');
      $('.barColor').remove();
      $('#barColorSync').prop('checked', true);

      alert("You have changed the graph's style: please re-enter your data and labels");
    }

    switch(value){
      case "nonstack":
        options.type = 0;
        $('#dataInst').text("* Please eneter a series of numerical values separated by commas (,)");
        $(".stackLabel").remove();
        break;

      case "uniStack":
        options.type = 1;
        $('#dataInst').text("* Please enter a series of numerical values separated by commas (,), and each group of values separated by semicolon (;): i.e. 1,2,3;4,5,6;7,8 -> first bar will display (1,2,3), the second (4,5,6) and the third (7,8)");
        if(!$(".stackLabel").length){
          $slLabel = $('<label for="stackLabel" class="stackLabel">Enter stack labels: </label>');
          $slText = $("<input>", {type:"text", id:"stackLabel", name:"stackLabel", class:"stackLabel"});
          $slInst = $('<p class="stackLabel">* Please enter a series of stack labels separated by commas (,)</p>');
          $slButton = $('<button id="enterStackLabel" class="stackLabel">submit stack labels</button>')
          $('#labelInst').after($slLabel, $slText, $slButton, $slInst);
        }
        break;

      case "arbStack":
        options.type = 2;
        $('#dataInst').text("* Please enter a series of numerical values separated by commas (,), and each group of values separated by semicolon (;): i.e. 1,2,3;4,5,6;7,8 -> first bar will display (1,2,3), the second (4,5,6) and the third (7,8)");
        if(!$(".stackLabel").length){
          $slLabel = $('<label for="stackLabel" class="stackLabel">Enter stack labels: </label>');
          $slText = $("<input>", {type:"text", id:"stackLabel", name:"stackLabel", class:"stackLabel"});
          $slInst = $('<p class="stackLabel">* Please enter a series of stack labels separated by commas (,), and each group of values separated by semicolon (;)</p>');
          $slButton = $('<button id="enterStackLabel" class="stackLabel">submit stack labels</button>')
          $('#labelInst').after($slLabel, $slText, $slButton, $slInst);
        }
        break;
    }
  });

  //GLOBAL FONT SETTINGS -> this can be done efficietly using classes....
  $('input[type=checkbox][name=fontSync]').on('change', function(){
    let boxChecked = $('input[type=checkbox][name=fontSync]').is(":checked");
    if(boxChecked){
      options.font.sync = true;
      let globalFont = $("#docFont").children("option:selected").val();
      let globalColor = $("#fontColor").val();
      options.font.color = globalColor;
      options.font.type = globalFont;
      options.title.font = globalFont;
      options.title.color = globalColor;
      options.axis.xfont = globalFont;
      options.axis.xcolor = globalColor;
      options.axis.yfont = globalFont;
      options.axis.ycolor = globalColor;
      options.legend.font = globalFont;
      options.legend.color = globalColor;

      $('#docFont').prop('disabled', false);
      $('#fontColor').prop('disabled', false);

      $('#titleFont').prop('disabled', true);
      $('#titlecolor').prop('disabled', true);
      $('#xfont').prop('disabled', true);
      $('#xcolor').prop('disabled', true);
      $('#yfont').prop('disabled', true);
      $('#ycolor').prop('disabled', true);
      $('#legendFont').prop('disabled', true);
      $('#legcolor').prop('disabled', true);
    }
    else{
      options.font.sync = false;
      options.title.font = $("#titleFont").children("option:selected").val();
      options.title.color = $("#titlecolor").val();
      options.axis.xfont = $("#xfont").children("option:selected").val();
      options.axis.xcolor = $("#xcolor").val();
      options.axis.yfont = $("#yfont").children("option:selected").val();
      options.axis.ycolor = $("#ycolor").val()
      options.legend.font = $("#legendFont").children("option:selected").val();
      options.legend.color = $("#legcolor").val()

      $('#docFont').prop('disabled', true);
      $('#fontColor').prop('disabled', true);

      $('#titleFont').prop('disabled', false);
      $('#titlecolor').prop('disabled', false);
      $('#xfont').prop('disabled', false);
      $('#xcolor').prop('disabled', false);
      $('#yfont').prop('disabled', false);
      $('#ycolor').prop('disabled', false);
      $('#legendFont').prop('disabled', false);
      $('#legcolor').prop('disabled', false);
    }
  });
  $('#docFont').on('change', ()=>{
    let globalFont = $("#docFont").children("option:selected").val();
    options.title.font = globalFont;
    options.axis.xfont = globalFont;
    options.axis.yfont = globalFont;
    options.legend.font = globalFont;
  });
  $('#fontColor').on('change', ()=>{
    let globalColor = $("#fontColor").val();
    options.title.color = globalColor;
    options.axis.xcolor = globalColor;
    options.axis.ycolor = globalColor;
    options.legend.color = globalColor;
  });

  //TITLE SETTINGS
  $('#updateTitle').on('click',()=>{
    let title = $('#title').val();
    if(checkSpecialChar(title)) alert("Please enter a title without special characters: [ \\ ^ $ . | ? * + ( )");
    else{
      options.title.text = title;
    }
  });
  $('#titleFont').on('change', ()=>{
    options.title.font = $('#titleFont').children("options:selected").val();
  });
  $('#titlecolor').on('change', ()=>{
    options.title.color = $('#titlecolor').val();
  });
  $('#titlesize').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num <=max) options.title.size = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });

  //DATA SETTINGS
  $('#enterData').on('click',()=>{
    data = [];
    let raw = $('#data').val();
    if(options.type === 0){
      let strData = raw.split(',');
      let invalid = false;
      for(let str of strData){
        let num = Number(str);
        if(isNaN(num)){
          alert("Please enter a series of numerical data separated by commas");
          invalid = true;
          break;
        }
        else data.push(num);
      }
      if(invalid) data = [];
    }
    else{
      let rows = raw.split(';');
      let numCol = 0;
      for(let row of rows){
        let strData = row.split(',');

        //check if number of stacks are consistent for every bar
        if(numCol === 0) numCol = strData.length;
        if(options.type === 1 && numCol !== 0 && strData.length !== numCol) alert("Plese make sure that your number of stacks are identical for every group of data you have entered");
        //

        else{
          let invalid = false;
          let rowNum = [];
          for(let str of strData){
            let num = Number(str);
            if(isNaN(num)){
              alert("Please make sure all your data is numerical, each groups of data is separated by semicolon, and each numerical values within those groups are separated by commas.");
              invalid = true;
              break;
            }
            else rowNum.push(num);
          }
          if(invalid){
            data = [];
            break;
          }
          else data.push(rowNum);
        }
      }
    }
  });

  //LABEL SETTINGS
  $("#enterDataLabel").on('click', ()=>{
    let raw = $('#dataLabel').val();
    if(checkSpecialChar(raw)) alert("Please make sure your labels do not include any special characters: [ \\ ^ $ . | ? * + ( )");
    else{
      let dl = raw.split(',').map(elem => elem.trim());
      if(dl.length === data.length) options.label.barLabel = dl;
      else alert("Please make sure that you have entered the data first, and the number of your bar labels matches the number of bars provided in your data");
    }
  });

  $(document).on('click',"#enterStackLabel", ()=>{
    let raw = $('#stackLabel').val();
    if(checkSpecialChar(raw)) alert("Please make sure that your labels do not include any special characters: [ \\ ^ $ . | ? * + ( )");
    else{
      if(options.type === 1){
        let sl = raw.split(',').map(elem => elem.trim());
        if(sl.length === data[0].length) options.label.stackLabel = sl;
        else alert("Please make sure that you have entered the data first, and the number of our stack labels match the number of stacks per bar provided in your data");
      }

      else{
        let invalid = false;
        let sl = [];
        let rows = raw.split(';');
        if(rows.length !== data.length){
          alert("Please make sure that you have entered the data first, and your stack labels are the same dimensions as your provided data");
          invalid = true;
        }
        else{
          for(let i=0 ; i<rows.length ; i++){
            let row = rows[i].split(',').map(elem => elem.trim());
            if(row.length !== data[i].length){
              alert("Please make sure that you have entered the data first, and your stack labels are the same dimensions as your provided data");
              invalid = true;
              break;
            }
            else{
              sl.push(row);
            }
          }
        }
        if(!invalid) options.label.stackLabel = sl;
      }
    }
  });

  //SIZE SETTINGS
  $(document).on('keyup mouseup', '#width', function(){
    let min = $('#width').prop('min');
    let max = $('#width').prop('max');
    let num = $('#width').val();
    if(num>=min && num <=max) options.dim.width = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });

  $(document).on('keyup mouseup', '#height', function(){
    let min = $('#height').prop('min');
    let max = $('#height').prop('max');
    let num = $('#height').val();
    if(num>=min && num <=max) options.dim.height = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });

  //BAR COLOR SETTINGS
  $(document).on('change', '#barColorSync', function(){
    let checked = $('#barColorSync').is(":checked");
    if(data.length === 0 || options.label.barLabel.length === 0){
      $(this).prop('checked', !checked);
      alert("Please enter your data and label first before configuring the colors");
    }
    else if(checked){
      $('#allBar').prop('disabled', false);
      if($('.barColor').length) $('.barColor').remove();
      options.bColor.allSync = true;
      options.bColor.allColor = $('#allBar').val();
    }
    else{
      options.bColor.allSync = false;
      options.bColor.stackSync = false;
      $('#allBar').prop('disabled', true);
      let currColor;
      let savedColors = options.bColor.colors;

      if(options.type === 0){
        let bLabel = options.label.barLabel;
        for(let i=0 ; i<bLabel.length; i++){
          currColor = bLabel[i] in savedColors ? savedColors[bLabel[i]] : "#ff0000";
          $bcLabel = $(`<label for="${bLabel[i]}" class="barColor">Select the color for ${bLabel[i]}:</label>`);
          $bcSelect = $(`<input type="color" id="${bLabel[i]}" name="${bLabel[i]}" class="barColor" value=${currColor}>`);
          savedColors[bLabel[i]] = currColor;

          $("#barColorSetting").append($bcLabel, $bcSelect);
        }
      }

      else if(options.type === 1){
        $stackSync = $(`<input type="checkbox" id="stackColorSync" name="stackColorSync" class="barColor" value="stackColorSync">`);
        $stackSyncLabel = $(`<label for="barColorSync" class="barColor">synchronize stack colors?</label>`);
        $('#allBar').after($stackSync, $stackSyncLabel);

        options.bColor.stackSync = false;
        let bLabel = options.label.barLabel;
        let sLabel = options.label.stackLabel;
        for(let i=0 ; i<bLabel.length ; i++){
          for(let j=0 ; j<sLabel.length ; j++){
            let name = `${bLabel[i]}-${sLabel[j]}`;
            currColor = name in savedColors ? savedColors[name] : "#ff0000";
            $bcLabel = $(`<label for="${name}" class="barColor uniStack">Select the color for ${name}:</label>`);
            $bcSelect = $(`<input type="color" id="${name}" name="${name}" class="barColor uniStack" value=${currColor}>`);
            savedColors[name] = currColor;

            $("#barColorSetting").append($bcLabel, $bcSelect);
          }
        }
      }

      else{
        let bLabel = options.label.barLabel;
        let sLabel = options.label.stackLabel;
        for(let i=0 ; i<bLabel.length ; i++){
          let stack = sLabel[i];
          let currBar = bLabel[i];
          for(let j=0 ; j<stack.length ; j++){
            let name = `${currBar}-${stack[j]}`;
            currColor = name in savedColors ? savedColors[name] : "#ff0000";
            $bcLabel = $(`<label for="${name}" class="barColor">Select the color for ${name}:</label>`);
            $bcSelect = $(`<input type="color" id="${name}" name="${name}" class="barColor" value=${currColor}>`);
            savedColors[name] = currColor;

            $("#barColorSetting").append($bcLabel, $bcSelect);
          }
        }
      }
    }
  });

  $(document).on('change', '#stackColorSync', () => {
    let checked = $('#stackColorSync').is(":checked");
    if($(".barColor.uniStack").length !== 0) $(".barColor.uniStack").remove();

    let bLabel = options.label.barLabel;
    let sLabel = options.label.stackLabel;
    let currColor;
    let unsyncColors = options.bColor.colors;
    let syncColors = options.bColor.stackColors;

    if(data.length ===0 || bLabel.length === 0) alert("Please enter your data and label first");
    else if(checked){
      options.bColor.stackSync = true;
      for(let i=0; i<sLabel.length ; i++){
        currColor = sLabel[i] in syncColors ? syncColors[sLabel[i]] : "#ff0000";
        $bcLabel = $(`<label for="${sLabel[i]}" class="barColor uniStack sync">Select the color for ${sLabel[i]}:</label>`);
        $bcSelect = $(`<input type="color" id="${sLabel[i]}" name="${sLabel[i]}" class="barColor uniStack sync" value=${currColor}>`);
        syncColors[sLabel[i]] = currColor;

        $("#barColorSetting").append($bcLabel, $bcSelect);
      }
    }
    else{
      options.bColor.stackSync = false;
      for(let i=0 ; i<bLabel.length ; i++){
        for(let j=0 ; j<sLabel.length ; j++){
          let name = `${bLabel[i]}-${sLabel[j]}`;
          currColor = name in unsyncColors ? unsyncColors[name] : "#ff0000";
          $bcLabel = $(`<label for="${name}" class="barColor uniStack">Select the color for ${name}:</label>`);
          $bcSelect = $(`<input type="color" id="${name}" name="${name}" class="barColor uniStack" value=${currColor}>`);
          unsyncColors[name] = currColor;

          $("#barColorSetting").append($bcLabel, $bcSelect);
        }
      }
    }
  });

  $(document).on('change', '#allBar', ()=>{
    options.bColor.allColor = $('#allBar').val();
  });
  $(document).on('change', 'input[type="color"].barColor',function (){
    let name = $(this).attr('id');
    if($(this).hasClass("sync")) options.bColor.stackColors[name] = $(this).val();
    else options.bColor.colors[name] = $(this).val();
  });

  //AXES SETTINGS
  $('#showx').on('change', function(){
    if($(this).is(':checked')) options.axis.xshow = true;
    else options.axis.xshow = false;
  });
  $('#xsize').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num<=max) options.axis.xsize = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });
  $('#xcolor').on('change', function(){
    options.axis.xcolor = $(this).val();
  });
  $('#xfont').on('change', function(){
    options.axis.xfont = $(this).children("option:selected").val();
  });
  $('#xangle').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num<=max) options.axis.xangle = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });

  $('#showy').on('change', function(){
    if($(this).is(':checked')) options.axis.yshow = true;
    else options.axis.yshow = false;
  });
  $('#ysize').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num<=max) options.axis.ysize = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });
  $('#ycolor').on('change', function(){
    options.axis.ycolor = $(this).val();
  });
  $('#yfont').on('change', function(){
    options.axis.yfont = $(this).children("option:selected").val();
  });
  $('#yangle').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num<=max) options.axis.yangle = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });
  $('#numTicks').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let num = Number($(this).val());
    if(num>=min) options.axis.numticks = num;
    else{
      $(this).val('');
      alert(`Please enter a positive value`);
    }
  });

  //LEGEND SETTINGS
  $('#showleg').on('change', function(){
    if($(this).is(':checked')) options.legend.show = true;
    else options.legend.show = false;
  });
  $('#legWidth').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num<=max) options.legend.width = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });
  $('#legHeight').on('keyup mouseup', function(){
    let min = Number($(this).prop('min'));
    let max = Number($(this).prop('max'));
    let num = Number($(this).val());
    if(num>=min && num<=max) options.legend.height = num;
    else{
      $(this).val('');
      alert(`Please enter a value between ${min} and ${max}`);
    }
  });
  $("#legcolor").on('change', function(){
    options.legend.color = $(this).val();
  });
  $('#legendFont').on('change', function(){
    options.legend.font = $(this).children("option:selected").val();
  });
  $('#legendLoc').on('change,', function(){
    options.legend.loc = $(this).children("option:selected").val();
  });

  //DRAW GRAPH
  $(document).on('click', '#refreshGraph', function(){
    console.log(options);
  });





  //HELPER FUNCTIONS
  const checkSpecialChar = text =>{
    return (text.includes('[') || text.includes('\\') || text.includes('$') || text.includes('.') || text.includes('|') || text.includes('?') || text.includes('*') || text.includes('+') || text.includes('(') || text.includes(')') || text.includes('^'));
  };

});
