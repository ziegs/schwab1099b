# Schwab 1099-B Converter

The purpose of these two scripts is to automate entering stock sales from the
Schwab EAC 1099-B form into TurboTax Online.

There are several steps to this process, but it does work. And it can save a
lot of time trying to enter the transaction manually.

1. Log into the Schwab EAC and then visit each of these links to download a PDF
   of the 1099-B forms. You may only have one of these or both:

   * https://eac.schwab.com/eac/myawards/eDocuments/taxForms.do?tabSource=statTab&linkSource=taxForms&psymbol=GOOGL
   * https://eac.schwab.com/eac/myawards/eDocuments/taxForms.do?tabSource=statTab&linkSource=taxForms&psymbol=GOOG

2. For each PDF, select some text, do select all with cmd-A, the copy with cmd-C. Open a text
   editor and paste the contents into a plain text file and save as something like `goog-1099b.txt`.

3. Run the Python script in this repository against the files. If you have two files, you should
   process them both at the same time:

   `$ ./convert-1099b-json.py goog-1099b.txt googl-1099b.txt`

   Some totals will be printed out that you should compare to the original 1099-B forms to make
   sure all transactions were processed.
   You will now have two files short.json containing all of your GOOG and GOOGL short-term
   transactions (taxed as regular income), and long.json containing all of your long-term
   transactions (taxed at a lower rate). The number of transactions of each type is also printed.

4. The next part of the process takes part in the browser on turbotax.com. I used
   Google Chrome on MacOS. It should work with other browsers, but I didn't try it.
   Open the TurboTax site and navigate to the section for entering stock transactions.
   A screen will present check boxes for box A, B, C, etc. Check box B for the short term
   transactions, or box E for the long term.

5. Once you're on the page where you enter transactions, open the Developer Tools window
   (Settings -> More Tools). Click on the "Console" tab if it's not already selected.

6. Copy the contents of the enter.js file in this repository, click your cursor into the console
   area of the browser, and paste. This won't take any action other than defining a bunch of
   functions.

7. Now do the same for the contents of the `short.json` file created above. Copy the contents.
   Paste it into the console window.

8. Now the fun begins. You'll notice the form only has 3 entries available. In the console,
   type:

   `> addEntries()`

   This will add more entries. Ideally you should have 24 entries
   available and the button to add more should be gone. If not, manually push the add more
   entries button until it's gone. (I couldn't find the right delay amount to make this work
   automatically 100% of the time.)

9. Now type in the console:

   `> enterValues(0, 24)`

   Or if you have fewer than 24 transactions, use that number. You should see all of your data
   entered automatically.

10. *Very important!* Click in the first entry field and use the tab key to advance through every
    field in the form. Yes, it's annoying, but TurboTax will not recognize the entries otherwise.
    This is a very good opportunity to double-check that everything was entered correctly.

11. Click the Continue button.

12. If you have more transactions, click Add More, and do the same process again but this time
    use `enterValues(24, 24)`. Next time use `enterValues(48, 24)`. Etc. When you get to the end,
    adjust the second value to the number you have remaining, otherwise you'll get an error.

13. Once all the short term transactions are completed, go back to step 7 and use the `long.json`
    file instead.

14. That's it. Hopefully all of your transactions are now entered into TurboTax.
