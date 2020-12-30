$(document).ready(()=>{
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
  let data;
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
      sync:true,
      colors:'#000000'
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
      yangle: 0
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
  $('input[type=radio][name=type]').on('change', ()=>{
    let value = $('input[name=type]:checked').val();
    switch(value){
      case "nonstack":
        options.type = 0;
        break;
      case "uniStack":
        options.type = 1;
        break;
      case "arbStack":
        options.type = 2;
        break;
    }
  });

  //GLOBAL FONT SETTINGS
  $('input[type=checkbox][name=fontSync]').on('change', ()=>{
    let boxChecked = $('input[type=checkbox][name=fontSync]').is(":checked");
    if(boxChecked){
      options.font.sync = true;
      let globalFont = $("#docFont").children("option:selected").val();
      let globalColor = $("#fontColor").val();
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

  //DATA SETTINGS

  //LABEL SETTINGS

  //SIZE SETTINGS

  //BAR COLOR SETTINGS

  //AXES SETTINGS

  //LEGEND SETTINGS

  //HELPER FUNCTIONS

  const checkSpecialChar = text =>{
    return (text.includes('[') || text.includes('\\') || text.includes('$') || text.includes('.') || text.includes('|') || text.includes('?') || text.includes('*') || text.includes('+') || text.includes('(') || text.includes(')') || text.includes('^'));
  };
});
