import Layout from '../common/Layout';

export default function Login() {
  return (
    <Layout name='login'>
      <div className='inner'>
        <div className='frame'>
          <h2>
            <p>Yu</p>
            <p><span></span><span></span></p>
            <p>joo</p>
          </h2>
          <form>
            <ul>
              <li>
                <label htmlFor='email' className='placeholder'>Email address</label>
                <input type='email' name='email' id='email' />
              </li>
              <li>
                <label htmlFor='password' className='placeholder'>Password</label>
                <input type='password' name='password' id='password' autoComplete='off' />
              </li>
              <li>
                <p>
                  <input type='checkbox' name='remember' id='remember' />
                  <label htmlFor='remember' className='remember'>
                    <span>Remember Me</span>
                  </label>
                </p>
                <p>
                  <span className='find'>Find Email</span>
                  <span>Password</span>
                </p>
              </li>
              <li>
                <button type='submit'>Login</button>
              </li>
              <li className='join'>
                <span>join as a member</span>
              </li>
            </ul>

          </form>
        </div>
      </div>
    </Layout>
  );
}