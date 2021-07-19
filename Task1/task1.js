//1. ES6 methods

const test = () => {
    console.log("Hello World!");
    const arr = [1, 2, 3];
    const arr_modified = arr.map(e => e + 1); //map function
    console.log(arr_modified);

    for (elem of arr_modified) // for/of
        console.log(elem);
};

//2. var vs const vs let

const test2 = () => {

    var i_do_not_use_var_due_to_pottential_buggs = "var";
    let let_is_a_better_var = "let";
    const do_not_modify_me = "const";

    console.log(i_do_not_use_var_due_to_pottential_buggs,
        let_is_a_better_var,
        do_not_modify_me);

    //the below code will print error. Const does not allow modifications
    //do_not_modify_me = "const2"; 

    {
        var another_var = "var2";
        let another_let = "let2";

        console.log(another_var, another_let);
    }

    //The below code will print reference error for another_let
    //console.log(another_var, another_let);

    //Let allows the use of the varriable only between the { } enclosing where it is defined

    //Var will work for the entire function body which could result in a harder code understanding and buggs
    console.log(another_var);
};

//3. Spread operator

const support = (a, b, c, d) => {

    console.log(a, b, c, d);
};

const test3 = () => {

    //array use cases

    let arr = ["a", "b", "c", "d", "e"];
    support(...arr); // Will only use the 4 letters in the array
    arr = [...arr, 5]; // spread keeps the values of arr and adds the value 5
    console.log(arr);

    //object use cases

    let my_obj = {
        first: 1,
        second: 2
    };

    console.log(my_obj);

    let my_obj2 = {...my_obj, third: 3}; 
    //keeps the key:value assignments from the first object
    //on top of that it adds one more key:value

    console.log(my_obj2);
};

//4. objects

const key = "secret_key";

const test4 = () => {

    const my_obj = {
        [key]: "You are not supposed to read this!",
        key: "This is more visible"
    };

    //iterate through the object
    for (const obj_key in my_obj)
        console.log(`${obj_key}: ${my_obj[obj_key]}`);

    const my_obj2 = {
        [key]: "this",
        key: "is",
        embedded_obj: {
            another_object: "another_object"
        }
    };

    //passing reference

    const copy0 = my_obj2; //copy0 actually points to the same object. It is not a new one
    console.log(copy0);

    //shallow copies

    //1. Using spread
    const copy1 = {...my_obj2};
    console.log(copy1);

    //The below code changes the value of the key another_object from within the embedded object
    my_obj2.embedded_obj.another_object = "surprise";
    //This is a shallow copy as this change is also reflected in copy1. This should not be the case for a deep copy.
    console.log(copy1);

    //2. Using Object.assign()
    // Same thing shallow copy
    const copy2 = Object.assign(my_obj2);
    console.log(copy2);
    my_obj2.embedded_obj.another_object = "wow";
    console.log(copy2);

    //deep copies using JSON.stringify() and JSON.parse()

    const copy3 = JSON.parse(JSON.stringify(my_obj2));
    console.log(copy3);
    my_obj2.embedded_obj.another_object = "finally?";
    console.log(copy3);
};

//5. Arrays

const test5 = () => {

    //itterating
    const my_arr = [1, 2, 3, 4];

    for (let i = 0 ; i < my_arr.length ; i++)
        console.log(my_arr[i]);

    my_arr.forEach(e => console.log(e));

    //modifying - most are immutable, but some like push modify the array

    my_arr.push(5); // add new element to array
    console.log(my_arr);

    my_arr.sort((x, y) => y - x); //sort an array
    console.log(my_arr);

    const aux = my_arr.slice(1, 4); //it extracts the values from the array from 1 to 3 inclusively
    console.log(aux);

    //On top of these methods, we have filter, concat, find, reduce, includes, etc...

    //accessing elements

    console.log(my_arr[0]);
    my_arr.push([{a: "a"}, {a: "aa"}]);
    console.log(my_arr[5][0]["a"]); // This prints a
    console.log(my_arr[5][1]["a"]); // This prints aa
};

//6. promises, callback

//Both are used for handling asynchronous operations

const test6 = () => {

    const callbackFunctionSetTimeout = () => {
        console.log("Timeout done!");
    }; // This function is a callback for the setTimeout below which gets executed after 1 second

    setTimeout(callbackFunctionSetTimeout, 1000);

    //promise

    const funcWithPromise = (value) => {
        return new Promise((resolve, reject) => {
            if (value >= 5)
                resolve("Yep, you passed!");
            else
                reject(Error("You failed!"));
        });
    };

    funcWithPromise(6).then((str) => console.log(str)).catch(() => console.log("There is a next year!"));
    funcWithPromise(4).then((str) => console.log(str)).catch(() => console.log("There is a next year!"));
};

//7. Async/await
//The async function returns a promise which can be awaited

const test7 = () => {

    const asyncFunc = async () => {
        console.log("I am asynchronous!");
        return "something";
    };

    //the result of the function can be used as promise
    asyncFunc().then((value) => console.log(value));

    //using await. Even simpler than promises
    const awaitFunc = async () => {
        const res = await asyncFunc();
        console.log(res + " I did!");
    };

    awaitFunc().then(console.log("The await worked!"));
    // It might not be printed in the right order due to the asynchronous nature of JS
};

//8. Closures
// Function inside a function
// It can also be used to emulate private methods

const test8 = () => {

    const myFunc = (val1) => {

        const innerFunc = (val2) => {
            return val1 + val2;
        };

        return innerFunc;
    };

    const myFuncDeclared = myFunc(1);
    console.log(myFuncDeclared(10));
};

const main = () => {

    //test(); // ES6 methods
    //test2(); // var vs let vs const
    //tes3(); // spread
    //test4(); // objects
    //test5(); // arrays
    //test6(); //callbacks and promises
    //test7(); //async/await
    test8(); // closures
};

main();