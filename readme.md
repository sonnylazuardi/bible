Bible
=====

Simple way to read bible daily

## Technology

- Angular.js
- NET Bible API
- Sonnylab Alkitab API

## Sonnylab Alkitab API

This API comes from Sabdaweb Alkitab Online. You may use this API freely. This API would return in JSON with the following format:

- Get a complete chapter

        http://sonnylab.com/api/alkitab/Yohanes 3

this would return

        [
            {
                bookname: "Yohanes",
                chapter: "3",
                verse: "1",
                text: "Adalah seorang Farisi yang bernama Nikodemus, seorang pemimpin agama Yahudi."
            },
            {
                bookname: "Yohanes",
                chapter: "3",
                verse: "2",
                text: "Ia datang pada waktu malam kepada Yesus dan berkata: &quot;Rabi, kami tahu, bahwa Engkau datang sebagai guru yang diutus Allah; sebab tidak ada seorangpun yang dapat mengadakan tanda-tanda yang Engkau adakan itu, jika Allah tidak menyertainya.&quot;"
            },
            {
                bookname: "Yohanes",
                chapter: "3",
                verse: "3",
                text: "Yesus menjawab, kata-Nya: <span id="r">&quot;Aku berkata kepadamu, sesungguhnya jika seorang tidak dilahirkan kembali, ia tidak dapat melihat Kerajaan Allah.&quot;</span>"
            },
            ...
        ]

- Get a verse

        http://sonnylab.com/api/alkitab/Yohanes 3:16

this would return 

        [
            {
                bookname: "Yohanes",
                chapter: "3",
                verse: "16",
                text: "<span id="r">Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.</span>"
            }
        ]

## Todo 

- User Personalization

## License

MIT License (c) Sonny Lazuardi <sonnylazuardi@gmail.com>