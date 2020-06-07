var arrays = [10, 11]

function de(){

        arrays.push(1);

    setTimeout(de(),10000)
}
de();
module.exports = arrays