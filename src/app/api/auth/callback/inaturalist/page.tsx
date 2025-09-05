import { redirect } from 'next/navigation'

interface CallbackPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CallbackPage({
  searchParams,
}: CallbackPageProps) {
  const params = await searchParams
  const code = params.code as string | undefined
  const state = params.state as string | undefined
  const error = params.error as string | undefined

  // Log all search params for debugging
  console.log('All searchParams:', params)

  if (error) {
    console.error('OAuth error from iNaturalist:', error)
    return (
      <div>
        <h1>Authentication Error</h1>
        <p>Error: {error}</p>
        <p>
          Description: {params.error_description || 'No description provided'}
        </p>
      </div>
    )
  }

  if (!code) {
    return (
      <div>
        <h1>No Authorization Code</h1>
        <p>No code provided in callback</p>
        <p>Search params: {JSON.stringify(params)}</p>
      </div>
    )
  }

  console.log('Authorization code received:', code)
  console.log('State parameter:', state)

  // Prepare token exchange request
  const tokenRequestBody = new URLSearchParams({
    client_id: process.env.INATURALIST_CLIENT_ID!,
    client_secret: process.env.INATURALIST_CLIENT_SECRET!,
    code,
    redirect_uri: process.env.INATURALIST_REDIRECT_URI!,
    grant_type: 'authorization_code',
  })

  console.log('Token request body:', tokenRequestBody.toString())

  // Log environment variables (be careful in production!)
  console.log('Environment check:')
  console.log('- CLIENT_ID exists:', !!process.env.INATURALIST_CLIENT_ID)
  console.log(
    '- CLIENT_SECRET exists:',
    !!process.env.INATURALIST_CLIENT_SECRET
  )
  console.log('- REDIRECT_URI:', process.env.INATURALIST_REDIRECT_URI)

  try {
    console.log('Making token exchange request...')

    const tokenResponse = await fetch(
      'https://www.inaturalist.org/oauth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'User-Agent': 'YourAppName/1.0', // Some APIs require this
        },
        body: tokenRequestBody.toString(),
      }
    )

    console.log('Token response status:', tokenResponse.status)
    console.log(
      'Token response headers:',
      Object.fromEntries(tokenResponse.headers.entries())
    )

    const responseText = await tokenResponse.text()
    console.log('Raw token response:', responseText)

    if (!tokenResponse.ok) {
      return (
        <div>
          <h1>Token Exchange Failed</h1>
          <p>Status: {tokenResponse.status}</p>
          <p>Response: {responseText}</p>
          <details>
            <summary>Debug Info</summary>
            <pre>
              {JSON.stringify(
                {
                  searchParams: params,
                  tokenRequestBody: tokenRequestBody.toString(),
                  responseStatus: tokenResponse.status,
                  responseHeaders: Object.fromEntries(
                    tokenResponse.headers.entries()
                  ),
                },
                null,
                2
              )}
            </pre>
          </details>
        </div>
      )
    }

    let tokenData
    try {
      tokenData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse token response as JSON:', parseError)
      return (
        <div>
          <h1>Invalid Token Response</h1>
          <p>Could not parse response as JSON</p>
          <p>Raw response: {responseText}</p>
        </div>
      )
    }

    console.log('Parsed token data:', tokenData)
    const { access_token, token_type, scope } = tokenData

    if (!access_token) {
      return (
        <div>
          <h1>No Access Token</h1>
          <p>Token exchange succeeded but no access_token in response</p>
          <p>Response: {responseText}</p>
        </div>
      )
    }

    console.log('Access token received, making user info request...')

    // Try to get user info
    const userResponse = await fetch(
      'https://api.inaturalist.org/v1/users/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }
    )

    console.log('User response status:', userResponse.status)
    const userResponseText = await userResponse.text()
    console.log('Raw user response:', userResponseText)

    if (!userResponse.ok) {
      return (
        <div>
          <h1>User Info Request Failed</h1>
          <p>Status: {userResponse.status}</p>
          <p>Response: {userResponseText}</p>
        </div>
      )
    }

    let userData
    try {
      userData = JSON.parse(userResponseText)
    } catch (parseError) {
      console.error('Failed to parse user response as JSON:', parseError)
      return (
        <div>
          <h1>Invalid User Response</h1>
          <p>Could not parse user response as JSON</p>
          <p>Raw response: {userResponseText}</p>
        </div>
      )
    }

    console.log('User data received:', userData)

    // Optional: Try the JWT endpoint as well
    try {
      const jwtResponse = await fetch(
        'https://www.inaturalist.org/users/api_token',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
          },
        }
      )

      const jwtResponseText = await jwtResponse.text()
      console.log('JWT response status:', jwtResponse.status)
      console.log('JWT response:', jwtResponseText)

      if (jwtResponse.ok) {
        const jwtData = JSON.parse(jwtResponseText)
        console.log('JWT data:', jwtData)
      }
    } catch (jwtError) {
      console.log('JWT request failed (optional):', jwtError)
    }

    // Success! Show the results
    return (
      <div>
        <h1>Authentication Successful!</h1>
        <h2>Token Info</h2>
        <p>Token Type: {token_type}</p>
        <p>Scope: {scope}</p>
        <p>Access Token: {access_token.substring(0, 20)}...</p>

        <h2>User Info</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>

        <p>
          <a href="/">Return to Home</a>
        </p>
      </div>
    )
  } catch (fetchError) {
    console.error('Network error during token exchange:', fetchError)
    return (
      <div>
        <h1>Network Error</h1>
        <p>Failed to make token exchange request</p>
        <p>
          Error:{' '}
          {fetchError instanceof Error
            ? fetchError.message
            : String(fetchError)}
        </p>
      </div>
    )
  }
}
