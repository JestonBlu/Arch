--this is a lua script for use in conky
require 'cairo'

function conky_main()
  if conky_window == nil then return end

  -- Set up the main window
  local cs = cairo_xlib_surface_create(conky_window.display, conky_window.drawable, conky_window.visual, conky_window.width, conky_window.height)
  cr = cairo_create(cs)

  -- Require for CPU display
  local updates=tonumber(conky_parse('${updates}'))
  if updates>5 then

    line_width=1
    line_cap=CAIRO_LINE_CAP_BUTT
    red,green,blue,alpha=148,148,148,1
    startx1=1
    starty1=12
    endx1=10
    endy1=12
    ----------------------------
    cairo_set_line_width (cr,line_width)
    cairo_set_line_cap (cr, line_cap)
    cairo_set_source_rgba (cr,red,green,blue,alpha)
    cairo_move_to (cr,startx1,starty1)
    cairo_line_to (cr,endx1,endy1)
    cairo_stroke (cr)

  end-- if updates>5

  cairo_destroy(cr)
  cairo_surface_destroy(cs)
  cr=nil

end-- end main function
