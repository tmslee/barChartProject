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
    */
});
