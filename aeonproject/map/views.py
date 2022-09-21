from django.shortcuts import render
import json, os, re, string
from django.conf import settings


def index(request):
    context = {}

    all_words = {}
    pages_path = os.path.join(settings.BASE_DIR,'map', 'data', 'pages.json')
    pages_file = open(pages_path)
    pages_dict = json.load(pages_file)
    for title, pg_dict in pages_dict.items():
        for piece in pg_dict["contents"]:
            #print("wtf is ",piece)
            if piece['type'] == "text":
                word_list = re.sub('['+string.punctuation+']', '', piece['content']).split()
                for word in word_list:
                    word = word.lower()
                    if word not in all_words:
                        all_words[word] = {"occurrences": 1, "pages": [title]}
                    else:
                        all_words[word]["occurrences"] += 1
                        if title not in all_words[word]["pages"]:
                            all_words[word]["pages"].append(title)

    #print(all_words)
    context["all_words"] = json.dumps(all_words)
    context["pages_dict"] = json.dumps(pages_dict)


    return render(request, os.path.join('map','index.html'), context)

