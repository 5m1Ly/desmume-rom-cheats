(() => {

    ////// PREDEFINED WORKERS \\\\\\

    const Master = {
        memo: [],
        prev: 0,
        fetch: query => {
            Master.main = document.querySelector(query);
            Master.children = Master.main.childNodes;
        },
        fetchIn: (key, query) => {
            Master[key] = Master.main.querySelectorAll(query);
        },
        mapChildren: function(node_list, callback) {
            for (let i = 0; i < node_list.length; i++) {
                const children = node_list[i].childNodes;
                for (let j = 0; j < children.length; j++) {
                    callback(children[j], i);
                    Master.prev = i;
                };
            };
            Master.prev = 0; // hard coded reset
        },
        listFilter: (key, fn) => {
            Master.mapChildren(Master[key], (item, i) => {
                Master.memo[i] = Master.memo[i] ?? "";
                Master.memo[i] += `${item.innerText}\n`;
                if (i > Master.prev)
                    fn(Master.memo[Master.prev]);
            });
        },
        rm: tag => {
            for (let i = 0; i < Master.children.length; i++)
                if (Master.children[i] && Master.children[i].tagName == tag)
                    Master.main.removeChild(Master.children[i]);
        }
    };

    ////// ACTUAL WORKING CODE \\\\\\

    // get the main element
    Master.fetch("section.entry-content");

    // remove the unwanted elements
    Master.rm("DIV");
    Master.rm("FIGURE");

    // fetch and store the element by query
    Master.fetchIn("titles", "h2");
    Master.fetchIn("lists", "ul");

    // filter the text within a list
    Master.listFilter("lists", console.log);

})();
