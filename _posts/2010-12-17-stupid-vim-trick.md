---
title: Stupid vim trick
categories:
- vim
tags: []
---

I decided yesterday to play with []():

```>
function EditFileLine(file_line)
  let file = substitute(a:file_line, '\(.*\):\(.*\)', '', '')
  let line = substitute(a:file_line, '\(.*\):\(.*\)', '', '')
  exe "ed" file
  normal gg
  exe +line

  hi CursorLine   cterm=NONE ctermbg=darkcyan ctermfg=black guibg=darkcyan guifg=black
  setlocal cursorline
  " au CursorMoved * setlocal nocursorline
endfunction

au BufNewFile *:* call EditFileLine(expand("<afile>:p"))
```

I had gotten tired of highlighting the file:line output in a gcc error message, only to paste it and have backspace to remove the line number.  This code will parse the file:line string, open the file, jump to the line, and lastly highlight the line that was jumped to.

Actually, it highlights the line under the cursor.  I wanted to turn the highlight off whenever the cursor is moved, but I'll settle for this.  (My feeble attempts at using autocmd CursorMoved to disable the highlight caused the highlight to disappear altogether; I'm guessing that vim moves the cursor again at some point after the BufNewFile autocmd is complete).

Sample usage:

```>
$ vim File.cpp +58 # before I had to type this
$ vim File.cpp:58  # now I can type this
```

It's odd how few examples I could find on the web that 1) use the []()() function with match groups, 2) reference []() (need to use the a: prefix), or 3) demonstrate how to use the []() and []() commands (the former is like typing a : in normal mode and then a command, while the latter is like playing back a macro from a function to simulate keypresses).

Some people might suggest that I learn how to use :make and :cope, and others might suggest that I use emacs.  I stopped using an IDE over ten years ago when I stopped using []() and [](), so I've been using the command line for too long to be comfortable with either of those "solutions".

