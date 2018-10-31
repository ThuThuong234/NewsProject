
/**
 * @apiDefine FailedResponse
 * @apiSuccessExample {json} Failed Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": false,
 *    "message": "Something wrong",
 *    "code": "ERROR_CODE"
 *  }
 */

/**
 * @apiDefine TokenHeader
 * @apiHeader {String} x-api-key API key to access the server
 * @apiHeader {String} x-access-token User token string to authorize
 */

/**
 * @apiDefine AccessHeader
 * @apiHeader {String} x-api-key API key to access the server
 */

/**
 * @apiDefine PagingParam
 * @apiParam {Number} [current_page = 1] Current page value
 * @apiParam {Number} [page_size = 10] Number of items per page value
 */

/**
 * @apiUse TokenHeader
 * @apiUse PagingParam
 *
 * @apiParam {Number} [information_id] PA information Id
 * @apiParam {String} [q] Keywords to search
 *
 * @apiSuccessExample {json} Success Response
 *  HTTP/1.1 200 OK
 *  {
 *    "success": true,
 *    "data": {
 *      "total_items": 25,
 *      "current_page": 1,
 *      "page_size": 10,
 *      "requests": [{
 *        "id": 1,
 *        "original_appraiser_name": "Tuan Ngo",
 *        "appraiser_name": "Tuan Le",
 *        "appraisee_name": "Vu Nguyen",
 *        "pa_score": 4,
 *        "status": 1,
 *        "is_pa": "false",
 *        "position_name": "SE1",
 *        "total_feedbacks": 1,
 *        "can_submit": true,
 *        "can_edit": true
 *      }]
 *    }
 *  }
 * @apiUse FailedResponse
 */
