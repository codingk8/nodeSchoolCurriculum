/* 20181124 Node School Paris
/* Count to 6 */

/* Rechercher process.argv */

/* Exo 1 - Bonjour ES6

Ma solution

console.log("BONJOUR ES6");

-----

Exo 2 - Template strings

Les chaînes de caractères interpolables ES6 (à l’avenir, on dira comme en anglais, 
hein : « template strings », c’est quand même nettement plus court…) 
utilisent une nouvelle syntaxe de String, basée sur des backticks (`) 
au lieu des apostrophes (') ou guillemets (") habituels. Les template strings 
vous offrent des possibilités bien plus puissantes pour construire du texte. 
Elles autorisent l’interpolation, avec la syntaxe que voici :

    `Salut, ${person}! 1 + 1 = ${1 + 1} !`

Elles peuvent aussi être multi-lignes, rien qu’en plaçant un saut de ligne littéral dans la chaîne :

    `Bonjour,
    monde !` 
    
## Défi

Votre programme recevra un nom comme premier argument sur sa ligne de commande (process.argv[2]). 
Vous devez afficher un message sur deux lignes, qui commence par saluer cette personne, 
puis lui indique son nom en minuscules. Par exemple, si le nom est « Domenic », vous afficheriez :

    Bonjour, Domenic !
    Ton nom en minuscules est "domenic".

Vous pouvez bien sûr commencer par faire ça en ES5 classique, mais la solution véritablement 
correcte utilise une seule template string ES6, et n’a pas recours à l’opérateur +.

Ma solution

let name = process.argv[2];
console.log(`Bonjour, ${name} !
Ton nom en minuscules est "${name.toLowerCase()}".`);

-----

Exo 3 - Fonctions fléchées 1e partie

Les fonctions fléchées (fonctions utilisant la nouvelle syntaxe avec =>) 
sont une des nouvelles fonctionalités d’ES6 les plus sympa.

Dans cet exercice, on va se concentrer sur leur utilisation la plus courante : 
réduire le code de fonctions simples. En ES6, on écrit une fonction fléchée comme ceci :

    x => x + 1

…et ça correspond au code ES5 suivant :

    function (x) { return x + 1; }

Plutôt sympa, n’est-ce pas ? Vous pouvez mettre n’importe quelle expression 
sur la droite du =>, et ça deviendra votre valeur de retour. 
C’est particulièrement utile lorsqu’on fait des opérations au travers d’itérateurs 
tels que map ou filter sur des collections.

Remarquez que si vous avez besoin de plusieurs arguments, il vous faudra les enrober entre des parenthèses, 
comme ceci :

    (x, y) => x + y

## Défi

Votre programme recevra sur la ligne de commande un nombre variable d’arguments 
(à partir de process.argv[2] et au-delà), qui seront tous à traiter comme des Strings. 
Utilisez les fonctions fléchées pour effectuer une opération de map-reduce sur ces données, 
avant d’afficher le résultat en console.

En gros, votre solution devrait ressembler à ça :
    var inputs = process.argv.slice(2);
    var result = inputs
      .map(\/* là on met quoi ? *\/
     .reduce(\/* et là, on met quoi ? *\/);

Plus spécifiquement, vous devrez :
  * Transformer chaque `String` entrante en son premier caractère ;
  * Réduire le tableau obtenu en concaténant les caractères ensemble.

Du coup, une entrée ["Salut", "les", "fonctions", "fléchées"] produirait "Slff".

Affichez le résultat sur la console, qu’on puisse le voir, en respectant le format suivant :

    [Salut,les,fonctions,fléchées] devient "Slff"

Attention au Slice, plus élémgant que le spit mais transforme la chaine

Ma solution

let inputs = process.argv.slice(2)
let result = inputs
    .map(input => input.slice(0, 1))
    .reduce((total, letter) => total + letter);
console.log(`[${inputs}] devient \"${result}\"`);

La solution officielle

var inputs = process.argv.slice(2);
var result = inputs
  .map(s => s[0])
  .reduce((soFar, s) => soFar + s);

console.log(`[${inputs}] devient "${result}"`);

-----

Exo 4 - Fonctions fléchées et This

Les fonctions fléchées nous aident aussi à mieux maîtriser la valeur de this, ce qui évite quelques confusions.

Les fonctions fléchées utilisent un this lexical. Vous ne savez probablement pas ce que ça veut dire. 
Et ce n’est pas grave.

Ce que vous avez besoin de savoir, c’est que la valeur de this dans une fonction fléchée est la même 
que celle dans la portée qui l’entoure. Si vous préférez, la valeur de this dans une fonction fléchée 
est la même que celle de this juste autour de cette fonction (dans le code). Étudions un exemple.

    var foot = {
        kick: function () {
            this.yelp = "Aïeuh !";
            setImmediate(function () {
                console.log(this.yelp);
            });
        }
    };
    foot.kick();

Quand l’appel à console.log() a lieu, un développeur JavaScript débutant pourrait s’attendre à ce 
que this.yelp contienne "Aïeuh !". En réalité, il est undefined, car la fonction que nous avons passée 
à setImmediate() a son propre this (qui, par défaut, est l’objet global, qui n’a pas de propriété yelp). 
En ES5, on dispose de plusieurs astuces pour contourner ce phénomène :

    setImmediate(function () {
        console.log(this.yelp);
    }.bind(this));

ou même :

    var that = this;
    setImmediate(function () {
        console.log(that.yelp);
    });

En ES6, les fonctions fléchées nous permettent d’éviter ce type de contournement et de juste 
écrire ce qu’on veut dire. Si nous utilisons une fonction fléchée comme fonction de rappel pour setImmediate(), 
le code fonctionnera comme on s’y attend.

## Défi

Faisons ça, tiens. En partant du premier code d’exemple ci-dessus, remplacez la fonction de rappel anonyme 
passée à setImmediate() par une fonction fléchée.

## Conseil

Pour déclarer une fonction fléchée qui n’attend aucun argument, vous devrez utiliser () => ….

Ma solution

var foot = {
    kick: function () {
        this.yelp = "Aïeuh !";
        setImmediate(() => console.log(this.yelp)
        );
    }
};
foot.kick();

-----

Exo 5 - Affectation par décomposition

L'affectation par décomposition est une opération qui rend possible l'extraction de variables 
depuis des tableaux ou des objets. Il s'agit d'une technique très pratique permettant d'extraire 
rapidement et sans fioritures les données nécessaires d'une structure complexe.

    let numbers = [1, 2, 3];
    let [foo, bar] = numbers;
    
    console.log(foo); // 1
    console.log(bar); // 2

Dans l'exemple ci-dessus, la valeur de la première case du tableau est affectée à la variable foo 
et la valeur de la seconde case à la variable bar.

Il est aussi possible d'assigner les valeurs à des propriétés d'un objet littéral en utilisant cette syntaxe :

    let numbers = [1, 2, 3];
    let data = {};
    [data.foo, data.bar] = numbers;
    
    console.log(data); // { foo: 1, bar: 2 }

Lorsqu'on décompose des tableaux, il est possible d'omettre des valeurs :

    let numbers = [1, 2, 3];
    let [foo, , baz] = numbers; // Si je n'ai pas besoin du deuxième élément
    
    console.log(foo); // 1
    console.log(baz); // 3

Tout comme les tableaux, les objets littéraux JavaScript peuvent être décomposés et affectés :

    let box = {width: 10, height: 5, depth: 4};
    let {width: x, depth} = box;
    
    console.log(x, depth); // 10 4
    //mais
    console.log(width); // ReferenceError: width is not defined

## Défi

Admettons que nous voulons extraire certaines informations bien spécifiques d'un tableau 
d'utilisateurs ayant la forme suivante :

    [userId, username, email, age, firstName, lastName]

Les différentes valeurs de ce tableau vous seront fournies en paramètres d'entrée. Voici comment les récupérer :

    let userArray = process.argv.slice(2); // 
    userArray vaudra par exemple [1, "jdoe", "jdoe@example.com", "John", "Doe"]

Votre mission si vous l'acceptez sera d'extraire les informations du nom d'utilisateur et de son email 
et de les assigner aux propriétés d'un objet littéral qui doivent s'appeler username et email.

Vous devrez ensuite logguer cet objet littéral pour valider le défi.

    let userArray = process.argv.slice(2);
    
    // votre solution ici ...
    
    console.log(/* votre résultat *\/); // {username: "jdoe", email: "john@doe.com"} 
    
    Ma solution

let userArray = process.argv.slice(2);
console.log({username: userArray[1], email: userArray[2]});

La solution officielle

let args = process.argv.slice(2);
let result = {};

[, result.username, result.email] = args;

console.log(result);

-----

Exo 6 - Décomposition 

ES6 fournit deux nouveaux concepts étroitement liés : le rest et le spread (« décomposition »), 
pour les fonctions dont le nombre d’arguments varie. Dans cet exercice, nous allons explorer la partie décomposition.

Un exemple classique de fonction variadique (dont le nombre d’arguments varie) est Math.max, 
qu’on peut appeler avec un nombre quelconque d’arguments : Math.max(1, 2) ou Math.max(1, 2, 3) ou…

En ES6, vous pouvez utiliser la syntaxe ...args pour « décomposer » un tableau en valeurs 
individuelles, notamment quand vous appelez ce genre de fonction. Par exemple :

    var numbers = [1, 1, 2, 3, 5, 8];
    var max = Math.max(...numbers);

Ça remplace un cas d’utilisation de notre vieux copain .apply(), et c’est tant mieux !

## Défi

Votre programme recevra un nombre variable d’arguments sur sa ligne de commande 
(à partir de process.argv[2] et au-delà), et tous seront à traiter comme des nombres. 
Utilisez l’opérateur de décomposition d’ES6 pour trouver la plus petite valeur parmi ces nombres, 
et l’afficher sur la console.

Et tant qu’à faire, affichons la liste des nombres d’abord, pour que ça soit clair. 
Votre affichage devrait donc avoir le format suivant :

    Le minimum de [18,5,7,24] est 5

Ma solution

let numbers = process.argv.splice(2);
console.log(`Le minimum de [${numbers}] est ${Math.min(...numbers)}`);

La solution officielle

var numbers = process.argv.slice(2);
var min = Math.min(...numbers);
console.log(`Le minimum de [${numbers}] est ${min}`);

-----

Exo 7 - REST

À présent que nous avons vu l’opérateur de décomposition, voyons son cousin, les paramètres rest.

Les paramètres rest sont utiles lorsque vous voulez écrire une fonction qui prend un nombre quelconque 
d‘arguments, mais traiter ceux-ci comme un tableau. Par exemple :

    function sum(...args) {
        var result = 0;
        args.forEach(function (value) {
            result += value;
        });
    
        return result;
    }
    
    sum(1, 2, 3); // => 6

Remarquez que dans l’exemple ci-dessus, args est un véritable tableau, puisqu’on peut appeler 
sa méthode .forEach() et toutes les autres. De la même manière que l’opérateur de décomposition 
nous débarrasse des bidouilles à base de .apply(), les paramètres rest envoient aux oubliettes 
la vieille astuce du Array.prototype.slice.call(arguments). En fait, vous n’aurez probablement plus 
jamais à utiliser cet affreux objet arguments. Hourra !

## Défi

Cet exercice utilise un format un peu différent de ceux que nous avons faits jusqu’ici. 
Cette fois, vous allez écrire un module Node, dont l’export par défaut sera une fonction de moyenne. 
Vous n’afficherez rien sur la console. Votre solution devrait avoir l’aspect suivant :

    module.exports = function average(/* que met-on ici ? *\/) {
        // et que met-on là ?
    };

    Nous testerons votre module en lui passant diverses séries d’arguments, 
    par exemple average(1, 2, 3) et average(5, 10), et en vérifiant qu’il fonctionne bien 
    dans tous les cas de figure.
    
    À part ça, le processus ne change pas, comme en attestent les instructions ci-dessous.

Ma solution

module.exports = function average(...nums) {
    let a = 0;
    let b = nums.length;
    for (const num of nums) {
        a+=num;
    }
    return a/b;
}; 

Ou bien 

module.exports = (...nums) => {
    let a = 0;
    let b = nums.length;
    for (const num of nums) {
        a+=num;
    }
    return a/b;
}; 

La solution officielle

module.exports = (...args) => {
        var sum = args.reduce((soFar, value) => soFar + value, 0);
        return sum / args.length;
    };

-----

Exo 8 - Arguments par défaut 1e partie

En ES6, les fonctions peuvent avoir des arguments par défaut :

    function sayHello(greeting = "Bonjour", name = "CampJS") {
        console.log(`${greeting} ${name} !`);
    }

Quand on appelle la fonction sans arguments pour ces positions, les valeurs par défaut sont utilisées à la place :

    sayHello();         // "Bonjour CampJS !"
    sayHello("Salut");  // "Salut CampJS !"

Vous pouvez aussi passer undefined pour n’importe quelle position d’argument 
afin d’en utiliser la valeur par défaut, si elle est définie :

    sayHello(undefined, undefined); // "Bonjour CampJS !"
    sayHello("Yo", undefined);      // "Yo CampJS !"
    sayHello(undefined, "JSConf");  // "Bonjour JSConf !"

Remarquez que undefined est la seule valeur qui déclenchera le recours à la valeur par défaut. 
Les valeurs falsy, telles que null, false, "" ou 0 seront utilisées telles quelles :

    sayHello(null, 0); // "null 0 !"

## Défi

Comme dans l’exercice sur les paramètres rest, vous devez écrire un module Node dont 
l’export par défaut est une fonction. Cette fois-ci, elle prendra deux arguments : 
une borne basse et une borne haute. Elle renverra le point milieu entre les deux.

Toutefois, elle se doit d’avoir des valeurs par défaut pertinentes. La borne basse devrait 
valoir par défaut 0, et la borne haute 1.

Comme précédemment, n’affichez rien dans la console. Votre solution devrait avoir l’aspect suivant :

    module.exports = function midpoint(/* que met-on ici ? *\/) {
        // et que met-on là ?
    };

    Nous testerons votre module en lui passant diverses séries d’arguments, 
    parfois aucun, parfois un, parfois deux. Parfois nous passerons même explicitement 
    undefined, aussi vous devriez vous assurer de traiter ce cas comme étant celui par défaut.

Ma solution

module.exports = function midpoint (lowPoint = 0, highPoint = 1) {
    return (lowPoint + highPoint)/2;
};

La solution officielle

module.exports = (x = 0, y = 1) => (x + y) / 2; 

-----

Exo 9 - Argument par défaut 2e partie

En JavaScript, contrairement à certains autres langages, les arguments par défaut peuvent être des expressions :

    function log(arg, transform = x => x) {
        console.log(transform(arg));
    }
    
    log("Bonjour");                       // => "Bonjour"
    log("Bonjour", y => y.toUpperCase()); // => "BONJOUR"

Dans l’exemple ci-dessus, la valeur par défaut pour le paramètre transform est la fonction identité, x => x.

Les valeurs des arguments par défaut peuvent même dépendre d’arguments précédents :

    function assertEquals5(val, error = `${val} n’est pas égal à 5 !`) {
        assert.strictEqual(val, 5, error);
    }
    
    assertEquals5(3); // "3 n’est pas égal à 5 !"

## Défi

Pour cet exercice, écrivez un module Node dont l’export par défaut est une fonction qui va 
rendre une String très, très importante. Pour ce faire, elle lui ajoutera un paquet de points 
d’exclamation sur la fin. Le nombre exact de points d’exclamation doit être configurable, 
mais par défaut, il devrait être égal à la longueur de la chaîne. Du coup :

    makeImportant("Hé", 5);              // => "Hé!!!!!"
    makeImportant("Hé");                 // => "Hé!!"
    makeImportant("Salut ?", undefined); // => "Salut ?!!!!!!!"

Un petit bonus ES6 qui pourrait s’avérer utile : on a désormais une méthode String.prototype.repeat() 
qui fait exactement ce que vous croyez.

Ma solution 

module.exports = function makeImportant(s, n = s.length) {
    return (`${s}${'!'.repeat(n)}`);
};

La solution officielle

module.exports = (string, bangs = string.length) => string + "!".repeat(bangs);

-----

Exo 10 - Tagged template strings

En plus des possibilités déjà évoquées, les template strings peuvent être tagged. 
On fait ça en préfixant un nom de fonction, par exemple fn, juste devant le littéral. Par exemple :

    fn`Bonjour ${you} ! Tu as l’air ${adjective} aujourd’hui !`

La sémantique d’une tagged template string est très différente de celle d’une template string 
classique. Fondamentalement, c’est un type spécial d’appel de fonction ; le code ci-dessus est en fait 
du « sucre syntaxique » pour le code suivant :

    fn(["Bonjour ", " ! Tu as l’air ", " aujourd’hui !"], you, adjective);

Remarquez comme le (n + 1)-ème argument correspond à la substitution qui doit avoir lieu entre 
la n-ème et la (n + 1)-ème chaîne du tableau initial. Ainsi, il y aura toujours au moins 
une chaîne de plus qu’il n’y a de substitutions ; dans l’exemple ci-dessus, on a 3 chaînes pour 2 substitutions.

Cette fonctionnalité peut s’avérer utile dans tout un tas de cas, mais celui qui vient immédiatement 
à l’esprit est l’échappement automatique des variables interpolées. Par exemple, vous pourriez écrire 
une fonction d’échappement HTML, la nommer html(), et vous pourriez alors faire :

    html`<p title="${title}">Bonjour ${you} !</p>`

…qui renverrait une String avec les variables interpolées aux bons endroits, 
mais avec tous leurs caractères dangereux pour HTML remplacés par les entités appropriées.

## Défi

Eh bien, faisons ça, justement. Votre programme recevra deux arguments en ligne de commande : 
un nom d’utilisateur, et un commentaire. Les deux risquent de contenir des caractères dangereux 
pour HTML (à savoir ', ", <, > et &). Votre travail consiste à utiliser les tagged template strings 
pour afficher une construction HTML du commentaire qui soit sécurisée pour les parties dynamiques (interpolées).

Par exemple, si le nom d’utilisateur est "Domenic" et le commentaire est "<dl> est une balise sympa", 
vous devriez afficher :

    <b>Domenic dit</b> : "&lt;dl&gt; est une balise sympa"

Comme par le passé, vous pouvez commencer par réaliser ça en ES5 traditionnel. 
Mais l’objectif ici est d’écrire une fonction qui puisse être utilisée comme tag 
pour des tagged template strings, et qui fera l’échappement automatiquement.

## Conseils

Si vous n’avez pas en tête les entités HTML nécessaires, les voici :

    ' | &apos;
    " | &quot;
    < | &lt;
    > | &gt;
    & | &amp;

Souvenez-vous que la meilleure manière de faire des remplacements globaux de texte en 
JavaScript, ce sont les expressions rationnelles, par exemple :

    var replacedS = originalS.replace(/a/g, "b");

L’aspect général de votre programme devrait être le suivant :

    console.log(html`<b>${process.argv[2]} dit</b> : "${process.argv[3]}"`);
    
    function html(/* que met-on là ? *\/) {
        // et que met-on ici ?
        // N’oubliez pas de renvoyer la `String` échappée !
    }

    Si vous ne savez pas par où commencer, pourquoi ne pas afficher avec console.log() les arguments que reçoit votre fonction html() ?
    
    Pour finir, n’hésitez pas à utiliser les paramètres rest si vous trouvez qu’ils vous facilitent la tâche !
    
Ma solution

console.log(html`<b>${process.argv[2]} dit</b> : "${process.argv[3]}"`);

function html(tpls, ...args) {
    var str = tpls[0];
    for (var i = 0; i < args.length; i++) {
        str = str + escape(args[i]) + tpls[i + 1];
    };
    return str;
}

function escape(raw) {
    return raw.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&apos;")
            .replace(/"/g, "&quot;");
};

La solution officielle

console.log(html`<b>${process.argv[2]} dit</b> : "${process.argv[3]}"`);
    
function html(pieces, ...substitutions) {
    var result = pieces[0];
    for (var i = 0; i < substitutions.length; ++i) {
        result += escape(substitutions[i]) + pieces[i + 1];
    }
    return result;
}

function escape(s) {
    return s.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&apos;")
            .replace(/"/g, "&quot;");
}
*/
