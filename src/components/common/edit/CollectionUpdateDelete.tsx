import { ApiResponseMessage } from '@/components/common/ApiResponseMessage'

import { ContentHandlerType, ApiResponse, Operation } from '@/types'

type Props = {
  type: ContentHandlerType
  apiResponse: ApiResponse
  deleteCollection: () => Promise<void>
  operation: Operation
}

export const CollectionUpdateDelete = ({
  type,
  apiResponse,
  deleteCollection,
  operation,
}: Props) => {
  return (
    operation === ('delete' as Operation) && (
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
  )
}
