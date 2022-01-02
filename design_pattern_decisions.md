Design patterens used for this dApp:

1. Interfaces- I created an ierc20 interface to deal with tokens rather than using open zeppelin's contracts

2. Access Control Design Patterns - I created a struct called Lock that takes note of msg.sender and indexes them as "owner" upon locking tokens. Upon withdraw this is checked to make sure the owner is the only one who can withdraw.

