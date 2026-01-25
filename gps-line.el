
;;;
This elisp function is similar to the what-line function from emacs, however it not only gives you your current line, but it also tells you how many total lines your file has. This program considers a line in a
file to be any string of chars terminated with a LF char ('\n'). This program can be loaded into your custom emacs and then invoked using M-x gps-line once it has been loaded in. 
;;;

(defun gps-line ()
  (interactive)
  (let ((n (line-number-at-pos))
        (num-lines 0))
    (save-excursion
      (goto-char (point-min))
      (while (search-forward "\n" nil t)
        (setq num-lines (1+ num-lines))))
    (message "Line%d/%d" n num-lines)))
