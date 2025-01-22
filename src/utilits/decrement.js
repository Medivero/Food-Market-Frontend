import getCookie from "../getCookie"
const ButtonDecrement = async (id,changeAmount,setAmountProduct) =>{
    try {
      const res = await fetch(`/api/User/GetUserCart/${getCookie('key')}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      const product = data.find((item) => item.productId == id)
      if (product){
        const idWhatIneed = product.elementId
        if (product.amount < 0 || product.amount === 0){
          return setAmountProduct(0)
        }
        else{
          if (product.amount == 1){
            try {
              await fetch(`/api/ShoppingCart/DeleteById/${product.elementId}`, {
                method: 'DELETE'
              })
              return changeAmount(),
              setAmountProduct('')
            } catch (error) {
              console.log(error)
            }
          }
          else {
            try{
              const needAmount = product.amount-1;
              await fetch('/api/ShoppingCart/UpdateAmount',{
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  elementId: idWhatIneed,
                  amount: needAmount
                })
              }
            )
             return changeAmount()
          } catch (error) {
            console.log(error)
          }
        }
        }
        
    } 
  } catch (error) {
    console.log(error)
  }
}
export default ButtonDecrement;
