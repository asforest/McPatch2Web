import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "@/store/modules/userStore.js";
import {message} from "antd";
import {useEffect, useState} from "react";

const Index = () => {

  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const [params] = useSearchParams();
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const user = useSelector(state => state.user)

  useEffect(() => {
    if (user.username) {
      setUsername(user.username);
    }

    const type = params.get('type');
    switch (type) {
      case 'signOut':
        messageApi.success('退出成功!');
        break;
      case 'changeUsername':
        messageApi.success('修改用户名成功!');
        break;
      case 'changePassword':
        messageApi.success('修改密码成功!');
        break;
      case 'notLogin':
        messageApi.success('请先登录!');
        break;
      case 'checkToken':
        messageApi.success('Token无效!');
        break;
    }
  }, []);

  const login = async (e) => {
    e.preventDefault()

    const password = e.target[1].value

    const {flag, msg} = await dispatch(userLogin(username, password));
    if (flag) {
      navigate('/dashboard');
    } else {
      messageApi.error(msg);
    }
  }

  return (
    <>
      {contextHolder}
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-500 dark:text-white space-y-5">
          <div className="text-center pb-8">
            <div className="text-4xl font-bold text-indigo-600">McPatch</div>
          </div>
          <form
            onSubmit={login}
            className="space-y-5">
            <div>
              <label>
                用户名
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                required
                className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label>
                密码
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#"
                 className="text-center text-indigo-600 dark:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400">忘记密码?</a>
            </div>
            <button
              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              type="submit">
              登录
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
