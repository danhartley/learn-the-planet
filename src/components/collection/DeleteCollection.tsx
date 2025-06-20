import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ContentHandlerType, ApiResponse } from '@/types'

type Props = {
  type: ContentHandlerType
  apiResponse: ApiResponse
  deleteCollection: () => Promise<void>
}

export const DeleteCollection = ({
  type,
  deleteCollection,
  apiResponse,
}: Props) => {
  return (
    <section aria-labelledby="delete-collection">
      <div>
        <h2 id="delete-collection">Delete {type} collection</h2>
      </div>
      <div className="form-row">
        <button onClick={deleteCollection}>Delete collection</button>
        <ApiResponseMessage apiResponse={apiResponse} />
      </div>
    </section>
  )
}
