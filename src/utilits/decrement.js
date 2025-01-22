import getCookie from "../getCookie"
const ButtonDecrement = async (id,changeAmount,setAmountProduct) =>{
    try {
      const res = await fetch(`http://194.58.34.224:14342/api/User/GetUserCart/${getCookie('key')}`, {
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
              await fetch(`http://194.58.34.224:14342/api/ShoppingCart/DeleteById/${product.elementId}`, {
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
              await fetch('http://194.58.34.224:14342/api/ShoppingCart/UpdateAmount',{
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