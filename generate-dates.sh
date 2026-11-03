
#!/usr/bin/env bash

set -euo pipefail

# Start and end dates
start_date="2022-11-02"
end_date="2026-11-01"

current_date="$start_date"

while [[ "$current_date" < "$end_date" || "$current_date" == "$end_date" ]]; do
    printf '%s\n' "$current_date"

    # Advance one day using Git Bash's date utility
    current_date=$(date -d "$current_date 1 day" +%Y-%m-%d)
done
