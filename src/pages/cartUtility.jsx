export default async function getAddress(userId) {
    try{
        const response = await fetch(`https://shopping-cart-backend-eta.vercel.app/api/profile/address/${userId}`);
        if(!response.ok){
            return [];
            
        }else{
            const data = await response.json();
            if(data?.message=='Address found succesfully.'){
                console.log("Addresss returned>>>",data.data.addresses)
                return data.data.addresses;
            }else if(data?.message=='No address found.'){
                return data.data.addresses;
            }
        }
    }catch(error){
        console.log("An error occurrred.");
        return []
    }
}

async function placeOrder(orderBody) {
  try{
   
    const response= await fetch('https://shopping-cart-backend-eta.vercel.app/api/profile/order/create',
        {
            method:'POST',
            body:JSON.stringify(orderBody),
            headers:{'Content-Type':'application/json'}
        });

    if(!response.ok){
        return "Order not created."
    }else{
        const data = await response.json();
        if(data?.message=='Order created successfully.'){
            
            return 'Order created successfully.';
        }
    }
    
  }  catch{
    console.log("An error occurred.")
  }
}

export async function handleSubmit(event,userId,cart,addressId,removeItemFromCart,setOrderStatus){
    event.preventDefault();
    try{
        if(userId && cart && addressId){
        const orderBody ={
            userId,cart,addressId
        }
       const orderResponse = await placeOrder(orderBody);
       console.log("order response >>>>",orderResponse);
       if(orderResponse==='Order created successfully.'){
        setOrderStatus(orderResponse);
        await Promise.all(cart.map(item => removeItemFromCart(item.product)));
        
        
       }else if(orderResponse==='Order not created.'){
        setOrderStatus(orderResponse);
       }
       setTimeout(()=>{
        setOrderStatus('')
       },3000)
    }
    }catch(error){
        console.log("An error occurred.")
    }
    
}


