import useJwt from "@/auth/jwt/useJwt"
import util from "@/auth/utils"
const state={
  user:[]


}

const getters={
  getUserData(){
    console.log(user)
    return user
  }

}
const actions={
async login(context,data){
  let response
  try{
    context.commit('getLoginData', response=await useJwt.login(data))
    return response
  }
  catch(err){
  return Promise.reject(new Error(400))
  }
  
}
}
const mutations={
  getLoginData(state,response){
    state.user=JSON.parse(JSON.stringify(response))
    useJwt.setToken(state.user.data.token)
    useJwt.setRefreshToken(state.user.data.refreshToken)
    localStorage.setItem('userData',JSON.stringify(response.data))
    console.log(response.data)

  }

}
export default {
  state,
  getters,
  actions,
  mutations
}