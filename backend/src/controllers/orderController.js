import { OrderService } from "../services/index.js";

async function postAddOrderCtrl(req, res) {
  try {
    const userId = req.authenticatedUserId;

    const result = await OrderService.addOrder(userId);
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserOrdersCtrl(req, res) {
  const userId = req.authenticatedUserId;

  try {
    const result = await OrderService.getOrdersByUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const OrderController = { postAddOrderCtrl, getUserOrdersCtrl };
