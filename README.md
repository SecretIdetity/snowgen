# snowgen
generate some pixel art snow gifs

usage:
```node index.js [name of resulting gif] [x resolution] [y resolution] [0-100 | gen a snowflake at the top] [0-100 | snowflake diverts] [-100-100 | wind] [000000-ffffff | colour] [length of repeating pattern (ideally yres / size, you should lower it if the gif gets too long)] [size of snowflakes] [gif speed (ms)] [0/1 | transparency (over black)] [(optional) background image]```

# example

`node index.js test 64 64 5 50 50 aaaaaa 64 1 100 1`

![test](https://user-images.githubusercontent.com/66640362/206583008-4157b7d2-c3a4-4477-84ed-f819cd1c0d43.gif)

# install

get recent versions of node and npm   
`npm init` in cloned repo    

version note:   
node 19.2.0   
npm 8.19.2   
npms see package-lock.json   
