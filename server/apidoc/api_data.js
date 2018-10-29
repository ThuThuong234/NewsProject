define({ "api": [
  {
    "type": "get",
    "url": "/users/pa-requests",
    "title": "Get PA Requests of User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "Any",
        "title": "Any account that authenticated",
        "description": "<p>Active users</p>"
      }
    ],
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "information_id",
            "description": "<p>PA information Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "q",
            "description": "<p>Keywords to search</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "current_page",
            "defaultValue": "1",
            "description": "<p>Current page value</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page_size",
            "defaultValue": "10",
            "description": "<p>Number of items per page value</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"data\": {\n    \"total_items\": 25,\n    \"current_page\": 1,\n    \"page_size\": 10,\n    \"requests\": [{\n      \"id\": 1,\n      \"original_appraiser_name\": \"Tuan Ngo\",\n      \"appraiser_name\": \"Tuan Le\",\n      \"appraisee_name\": \"Vu Nguyen\",\n      \"pa_score\": 4,\n      \"status\": 1,\n      \"is_pa\": \"false\",\n      \"position_name\": \"SE1\",\n      \"total_feedbacks\": 1,\n      \"can_submit\": true,\n      \"can_edit\": true\n    }]\n  }\n}",
          "type": "json"
        },
        {
          "title": "Failed Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": false,\n  \"message\": \"Something wrong\",\n  \"code\": \"ERROR_CODE\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/apidoc/apidoc.js",
    "groupTitle": "Users",
    "name": "GetUsersPaRequests",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-api-key",
            "description": "<p>API key to access the server</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>User token string to authorize</p>"
          }
        ]
      }
    }
  }
] });
