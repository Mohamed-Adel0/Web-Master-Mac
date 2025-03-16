let Burger = [
  {
    id: 1,
    title: "Hamburger",
    Sallary: "5.99$",
    image: "../pictures/Burgars.png",
  },
  {
    id: 2,
    title: "CheeseBurger",
    Sallary: "4.99$",
    image: "../pictures/McVeggie-Burger.png",
  },
  {
    id: 3,
    title: "Big Burger",
    Sallary: "7.99$",
    image: "../pictures/BigBurger.png",
  },
  {
    id: 4,
    title: "Superstars",
    Sallary: "9.99%",
    image: "../pictures/TabelBurger.jpg",
  },
];
const getLastSegment = () => {
  const segment = window.location.pathname.split("/").filter(Boolean);
  return segment.pop();
};
// This's For displaying items related to an array of objects
const FetchData = () => {
  const LastPath = getLastSegment();
  // console.log(LastPath);
  if (LastPath === "index.html") {
    // console.log("true");
    document.getElementById("home").classList.add("active");
  } else {
    document.getElementById("home").classList.remove("active");
    // console.log("false");
  }
  let FetchBurger = ``;
  for (let i = 0; i < Burger.length; i++) {
    FetchBurger += `
         <div  onclick="Product (${i})" class="img  w-[200px] h-[100%] flex justify-evenly items-center flex-col gap-2" >
                <img class="cursor-pointer w-[45%] h-[50%]" src="${Burger[i].image}" alt="">
            <h1>${Burger[i].title}</h1>
        </div>
        `;
  }
  document.getElementById("box-img").innerHTML = FetchBurger;
};
FetchData();
// Here Related By Input Search
const searchMo = (mo) => {
  let numberOne = 1;
  let FilterData = ``;
  for (let i = 0; i < Burger.length; i++) {
    if (Burger[i].title.toLowerCase().includes(mo.toLowerCase()) == true) {
      numberOne = i;
      numberOne++;
      console.log(Burger);
      FilterData += `    
           <div  onclick="Product (${i})" class="img  w-[200px] h-[100%] flex justify-evenly items-center flex-col gap-2" >
                <img class="cursor-pointer w-[45%] h-[50%]" src="${Burger[i].image}" alt="">
            <h1>${Burger[i].title}</h1>
        </div>`;
    }
  }
  document.getElementById("box-img").innerHTML = FilterData;
};

document.getElementById("search").addEventListener("input", function (mo) {
  searchMo(mo.target.value);
});
// This's for comparing an array of objects to display the required Data
const Product = (Props) => {
  let id = Props + 1;
  let InfoCard = Burger.find((e) => e.id === id);
  // console.log(InfoCard);
  if (Burger.find((e) => e.id === id)) {
    let heroimage = `
      <div class="box w-[95%] h-[65%] flex justify-between">
                <div class="paragraph card-hero flex flex-col w-[430px] justify-evenly">
                  <h1 class="text-4xl flex gap-5 justify-start items-center">${InfoCard.title} <img class="w-[45px] h-[35px] cursor-pointer" src="${InfoCard.image}" alt=""></h1>
                  <p class="text-[#181818af]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cum iusto assumenda! Totam quos facere ad at assumenda iste id aut deleniti reprehenderit dignissimos voluptates laudantium doloremque, ut hic earum!</p>
                  <h3 class="text-2xl">Price <span class="text-[#ffca40]">${InfoCard.Sallary}</span></h3>
                </div>
                <div class="image card-hero w-[450px] flex flex-col justify-evenly items-center">
                  <img class="h-[50%] w-[40%] object-fill" id="boximgx" src="${InfoCard.image}" alt="">
                  <button onclick="addToCart(${JSON.stringify(InfoCard.id)})" class="bg-[#ffca40] text-[#fff] w-[130px] h-[40px] rounded-[7px] cursor-pointer text-[15px]">Add To Cart</button>
                </div>
      </div>
    `;
    document.getElementById("hero-image").innerHTML = heroimage;
  } else {
    let heroimage = `
     <div class="box w-[95%] h-[65%] flex justify-between">
               <div class="paragraph card-hero  flex flex-col w-[430px] justify-evenly">
                 <h1 class="text-4xl flex gap-5 justify-start items-center">Big Burger <img class="w-[45px] h-[35px] cursor-pointer" src="./pictures/BigBurger.png" alt=""></h1>
                 <p class="text-[#181818af]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque cum iusto assumenda! Totam quos facere ad at assumenda iste id aut deleniti reprehenderit dignissimos voluptates laudantium doloremque, ut hic earum!</p>
                 <h3 class="text-2xl">Price <span class="text-[#ffca40]">5.99$</span></h3>
               </div>
               <div class="image  card-hero w-[450px] flex flex-col justify-evenly items-center">
                 <img class="h-[50%] w-[40%] object-fill" id="boximgx" src="./pictures/BigBurger.png" alt="">
               </div>
     </div>
   `;
    document.getElementById("hero-image").innerHTML = heroimage;
  }
  
};
Product();

// This Related By Cart System
let GetData = JSON.parse(localStorage.getItem("Cart")) || [];

const addToCart = (id) => {
 let Product = Burger.find((e) => e.id === id);
 
 if (!Product) return console.error("Product not found!");

 let existingItem = GetData.find((item) => item.id === id);
 if (!existingItem) {
 GetData.push(Product);
 localStorage.setItem("Cart", JSON.stringify(GetData));
 }

 updateCartUI();
};

const updateCartUI = () => {
 document.getElementById("total").innerHTML = GetData.length;
 let totalPrice = GetData.reduce((acc, item) => acc + parseFloat( item.Sallary || 0), 0);
 let PushData = GetData.map((item) => `
 <div class="card border-b border-[#ffca40] flex justify-between items-center h-[15%] w-[95%]">
 <div class="img w-[55px] h-[45px]">
 <img class="w-full h-full" src="${item.image}" alt="">
 </div>
 <h1 class="text-[20px]">${item.title}</h1>
 <h1 class="text-[#ffca40] text-[18px]">Price: $${item.Sallary}</h1>
 </div>
 `).join('');
  // console.log(totalPrice);
 document.getElementById("Cart").innerHTML = PushData + `<h2 class="text-[#ffca40] text-[18px]">Total Price: $${totalPrice}</h2>`; 
};
updateCartUI();
// Here Related By Open & Close element Cart
document.getElementById("iconCart").addEventListener("click",()=>{
  document.getElementById("hero-cart").classList.add("show")
})
document.getElementById("closeCart").addEventListener("click",()=>{
  document.getElementById("hero-cart").classList.remove("show")
})
