#!/bin/bash

ng build --prod --aot && aws s3 rm s3://blue-delta-ng2-app --recursive && aws s3 sync dist/ s3://blue-delta-ng2-app/