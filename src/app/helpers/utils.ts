import {Toast} from 'bootstrap';

export const formatToShortDate = (s: any) => {
  try{
    if(s==='')
      return null

    let d:Date = new Date(s)
    s = d.toISOString().split('T')[0]
    return s
  }
  catch (err){
    return null
  }
}

export const toastDanger = (message:string) => {
  const toastLiveExample = document.getElementById('liveToastDanger')
  if(!toastLiveExample)
    return

  toastLiveExample.getElementsByClassName('toast-body')[0].textContent=message
  const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()
}

export const toastSuccess = (message:string) => {
  const toastLiveExample = document.getElementById('liveToastSuccess')
  if(!toastLiveExample)
    return

  toastLiveExample.getElementsByClassName('toast-body')[0].textContent=message
  const toastBootstrap = Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()
}
